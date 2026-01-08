import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AtSign,
  FileText,
  Image,
  ArrowRight,
  Loader2,
  Palette,
  Zap,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profileApi } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import portfolio1Img from "@/bio-exempleimages/Portifolio 1.png";
import portfolio2Img from "@/bio-exempleimages/Portifolio 2.png";
import portfolio3Img from "@/bio-exempleimages/Portifolio 3.png";

const profileSchema = z.object({
  username: z
    .string()
    .min(3, "Username deve ter pelo menos 3 caracteres")
    .max(30, "Username deve ter no máximo 30 caracteres")
    .regex(
      /^[a-z0-9_-]+$/,
      "Username só pode conter letras minúsculas, números, _ e -"
    ),
  bio: z.string().max(500, "Bio deve ter no máximo 500 caracteres").optional(),
  avatarUrl: z.string().url("URL inválida").optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const templates = [
  {
    id: "template_01",
    name: "Minimal",
    description: "Clean e profissional",
    icon: <Palette className="w-6 h-6" />,
    color: "bg-slate-600",
    preview: "bg-slate-100",
    image: portfolio1Img,
  },
  {
    id: "template_02",
    name: "Neon",
    description: "Moderno e vibrante",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-blue-600",
    preview: "bg-blue-50",
    image: portfolio2Img,
  },
  {
    id: "template_03",
    name: "Creative",
    description: "Criativo e único",
    icon: <Rocket className="w-6 h-6" />,
    color: "bg-purple-600",
    preview: "bg-purple-50",
    image: portfolio3Img,
  },
] as const;

export function CreateProfilePage() {
  const navigate = useNavigate();
  const { user, setProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<
    "template_01" | "template_02" | "template_03"
  >("template_02");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const username = watch("username", "");

  const onSubmit = async (data: ProfileFormData) => {
    // Obter userId do localStorage (temporário) ou do user logado
    const userId = user?.id || localStorage.getItem("bio4dev_temp_user_id");

    if (!userId) {
      toast.error("Usuário não encontrado. Crie uma conta primeiro.");
      navigate("/signup");
      return;
    }

    setIsLoading(true);
    try {
      const response = await profileApi.create({
        userId,
        username: data.username,
        bio: data.bio || undefined,
        avatarUrl: data.avatarUrl || undefined,
        templateType: selectedTemplate,
        published: false,
      });

      // Salvar profileId para usar no setup
      localStorage.setItem("bio4dev_profile_id", response.profile.id);

      toast.success("Perfil criado com sucesso!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao criar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="flex-1 py-12 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Crie seu perfil
            </h1>
            <p className="text-slate-600 text-lg">
              Escolha seu username e template para começar
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            {/* Username e Bio */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Username */}
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-slate-700 flex items-center gap-2"
                  >
                    <AtSign className="w-4 h-4" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="seuusername"
                    className="border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 text-lg py-6"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-sm text-red-600">
                      {errors.username.message}
                    </p>
                  )}
                  {username && !errors.username && (
                    <p className="text-sm text-blue-600">
                      Seu link: bio4dev.com/{username}
                    </p>
                  )}
                </div>

                {/* Avatar URL */}
                <div className="space-y-2">
                  <Label
                    htmlFor="avatarUrl"
                    className="text-slate-700 flex items-center gap-2"
                  >
                    <Image className="w-4 h-4" />
                    URL do Avatar (opcional)
                  </Label>
                  <Input
                    id="avatarUrl"
                    type="url"
                    placeholder="https://exemplo.com/avatar.jpg"
                    className="border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                    {...register("avatarUrl")}
                  />
                  {errors.avatarUrl && (
                    <p className="text-sm text-red-600">
                      {errors.avatarUrl.message}
                    </p>
                  )}
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label
                    htmlFor="bio"
                    className="text-slate-700 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Bio curta (opcional)
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Uma breve descrição sobre você..."
                    rows={4}
                    className="border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    {...register("bio")}
                  />
                  {errors.bio && (
                    <p className="text-sm text-red-600">{errors.bio.message}</p>
                  )}
                </div>
              </div>

              {/* Preview Card */}
              <div className="flex items-center justify-center">
                <div
                  className={`w-full max-w-sm aspect-[3/4] rounded-2xl ${
                    templates.find((t) => t.id === selectedTemplate)?.preview
                  } p-6 border border-slate-200 shadow-sm`}
                >
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-slate-200 mb-4 overflow-hidden">
                      {watch("avatarUrl") ? (
                        <img
                          src={watch("avatarUrl")}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Image className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {username || "seuusername"}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-3">
                      {watch("bio") || "Sua bio aparecerá aqui..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Selection */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Escolha seu template
                </h2>
                <p className="text-slate-600">
                  Você pode trocar depois a qualquer momento
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`relative rounded-2xl border-2 transition-all overflow-hidden ${
                      selectedTemplate === template.id
                        ? "border-blue-500 ring-2 ring-blue-500/20"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    {selectedTemplate === template.id && (
                      <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Preview Image */}
                    <div className="aspect-[4/3] bg-slate-50 overflow-hidden">
                      <img
                        src={template.image}
                        alt={`Preview ${template.name}`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Template Info */}
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-10 h-10 rounded-lg ${template.color} flex items-center justify-center text-white flex-shrink-0`}
                        >
                          {template.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="text-base font-semibold text-slate-900">
                            {template.name}
                          </h3>
                          <p className="text-xs text-slate-600">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-6 text-lg rounded-lg"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Criar Perfil e Começar
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
