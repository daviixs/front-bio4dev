import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { landingTheme } from "@/theme/landingTheme";

export default function UserTypeSelectionPage() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<"dev" | "influencer" | null>(
    null
  );

  const handleContinue = () => {
    if (!selectedType) return;

    // Salvar tipo de usuário no localStorage
    localStorage.setItem("bio4dev_user_type", selectedType);

    // Redirecionar para criação de perfil
    const route =
      selectedType === "dev" ? "/profile/create/developer" : "/profile/create";
    navigate(route);
  };

  const userTypes = [
    {
      id: "dev" as const,
      title: "Desenvolvedor",
      description: "Portfólios técnicos com projetos, experiência e tech stack",
      icon: <Code className="w-12 h-12" />,
      color: landingTheme.accentBg,
      features: [
        "GitHub Integration",
        "Projetos Open Source",
        "Stack Tecnológica",
        "Experiência Profissional",
      ],
    },
    {
      id: "influencer" as const,
      title: "Influenciador",
      description: "Bio links estilizados com links e redes sociais",
      icon: <Users className="w-12 h-12" />,
      color: landingTheme.accentBg,
      features: [
        "Links Personalizados",
        "Redes Sociais",
        "Design Atraente",
        "Analytics",
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="flex-1 py-12 px-4 lg:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Qual tipo de perfil você quer criar?
            </h1>
            <p className="text-slate-600 text-lg">
              Escolha o formato ideal para o seu objetivo
            </p>
          </div>

          {/* Type Selection */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {userTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`relative p-8 rounded-2xl border-2 transition-all text-left ${
                  selectedType === type.id
                    ? `${landingTheme.accentBorder} ring-2 ${landingTheme.accentRing} shadow-lg`
                    : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {/* Selected Indicator */}
                {selectedType === type.id && (
                  <div className={`absolute top-4 right-4 w-8 h-8 rounded-full ${landingTheme.accentBg} flex items-center justify-center`}>
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

                {/* Icon */}
                <div
                  className={`w-20 h-20 rounded-xl ${type.color} flex items-center justify-center text-white mb-6`}
                >
                  {type.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-slate-600 mb-6">{type.description}</p>

                {/* Features */}
                <ul className="space-y-2">
                  {type.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedType}
              size="lg"
              className={`font-semibold px-12 py-6 text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${landingTheme.buttonPrimary}`}
            >
              Continuar
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
