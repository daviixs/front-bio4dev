import React, { useState } from "react";
import {
  MapPin,
  User,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Figma,
  Code2,
  ArrowUpRight,
  FolderGit2,
  ExternalLink,
  Cpu,
  MessageCircle,
  Phone,
  Send,
  Trash2,
  Plus,
  Pencil,
  Dribbble,
  Gitlab,
  Codepen,
  Pin,
  X,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { EditableResumeButton } from "./EditableResumeButton";
import { toast } from "sonner";
import {
  footerApi,
  legendaApi,
  techStackApi,
  workExperienceApi,
  projetosApi,
  socialApi,
} from "@/lib/api"; // APIs
import type {
  ProfileComplete,
  Social,
  Projeto,
  WorkExperience,
  Technology,
} from "@/types";
import { EditableField } from "./EditableField";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { TechIcon } from "./TechIcon";

// ==========================================
// TYPES
// ==========================================

export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  icon: LucideIcon;
  url: string;
  colorClass: string;
  textColorClass?: string;
  colSpan?: 1 | 2;
  bgImage?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string;
  current?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
}

interface TechOption {
  name: string;
  icon: string;
  color?: string;
}

// ==========================================
// COMPONENTS
// ==========================================

// --- Avatar.tsx ---
interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className="relative group">
      {/* Main Container */}
      <div className="relative w-40 h-40 mx-auto bg-[#fbbf24] rounded-full border-4 border-[#121318] overflow-hidden shadow-xl">
        <img src={src} alt={alt} className="w-full h-full object-cover pt-2" />
      </div>
    </div>
  );
};

// --- InfoRow.tsx ---
interface InfoRowProps {
  icon: LucideIcon;
  text: string;
  className?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({
  icon: Icon,
  text,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center gap-3 text-sm text-gray-300 ${className}`}
    >
      <Icon
        size={16}
        className={
          text.includes("Product Designer") || text.includes("Dev")
            ? "text-yellow-500"
            : "text-red-500"
        }
      />
      <span className="font-medium tracking-wide">{text}</span>
    </div>
  );
};

// --- SocialCard.tsx ---
interface SocialCardProps {
  item: SocialLink;
  onEdit?: () => void;
}

const SocialCard: React.FC<SocialCardProps> = ({ item, onEdit }) => {
  const textColor = item.textColorClass || "text-white";
  const subTextColor = item.textColorClass ? "text-gray-600" : "text-gray-400";

  return (
    <div
      onClick={(e) => {
        if (onEdit) {
          e.preventDefault();
          onEdit();
        }
      }}
      className={`
        ${item.colSpan === 2 ? "col-span-2" : "col-span-1"}
        ${item.colorClass}
        relative p-6 rounded-3xl transition-all duration-300 hover:scale-[1.02] active:scale-95
        flex flex-col justify-between
        shadow-md
        h-40
        group
        overflow-hidden
        border border-white/5
        cursor-pointer
      `}
    >
      <div className="flex justify-between items-start z-10">
        <div
          className={`p-2.5 rounded-xl ${
            item.id === "dev" ? "bg-black text-white" : "bg-white/10"
          }`}
        >
          <item.icon
            size={22}
            className={item.id === "dev" ? "text-white" : "text-white"}
          />
        </div>

        {/* Edit/Link Indicator */}
        <div
          className={`p-2 rounded-full bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center`}
        >
          {onEdit ? (
            <Pencil size={16} className="text-white" />
          ) : (
            <ArrowUpRight size={18} className="text-white" />
          )}
        </div>
      </div>

      <div className="z-10">
        {item.id === "github" && (
          <span className="mb-2 inline-block px-2.5 py-0.5 text-[10px] font-bold bg-white text-black rounded uppercase tracking-wider">
            Follow
          </span>
        )}
        <h3 className={`font-bold text-lg ${textColor}`}>{item.name}</h3>
        <p className={`text-xs ${subTextColor} font-medium truncate mt-0.5`}>
          {item.handle || "Click to add link"}
        </p>
      </div>
    </div>
  );
};

// --- ExperienceTimeline.tsx ---
interface ExperienceTimelineProps {
  data: Experience[];
  onEdit?: (exp: Experience) => void;
  onAdd?: () => void;
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  data,
  onEdit,
  onAdd,
}) => {
  return (
    <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
          Experience
        </h2>
        {onAdd && (
          <Button
            onClick={onAdd}
            size="sm"
            variant="ghost"
            className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10"
          >
            <Plus size={16} className="mr-1" /> Add
          </Button>
        )}
      </div>

      <div className="relative border-l border-gray-800 ml-3 space-y-8">
        {(!data || data.length === 0) && (
          <p className="text-gray-500 text-sm ml-6">No experience added.</p>
        )}
        {data &&
          data.map((item, index) => (
            <div
              key={item.id}
              className="ml-6 relative group cursor-pointer"
              onClick={() => onEdit && onEdit(item)}
            >
              {/* Dot on timeline */}
              <span
                className={`absolute -left-[1.95rem] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#121318] ${
                  item.current ? "bg-yellow-500 animate-pulse" : "bg-gray-600"
                }`}
              ></span>

              <div className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                  <Pencil size={14} className="text-white" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                <h3 className="text-white font-semibold text-lg">
                  {item.role}
                </h3>
                <time className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                  {item.date}
                </time>
              </div>

              <p className="text-yellow-500/90 text-sm font-medium mb-2">
                {item.company}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

// --- ProjectCard.tsx ---
interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-[#18181b] p-5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white/5 rounded-lg text-yellow-500">
          <FolderGit2 size={20} />
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>

      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium px-2 py-1 bg-white/5 text-gray-300 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- TechStack.tsx ---
interface TechStackProps {
  data: Technology[];
  onAdd?: (tech: Technology) => void;
  onRemove?: (tech: Technology) => void;
}

interface AddTechDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (tech: Technology) => void;
}

const TECH_OPTIONS: TechOption[] = [
  // 🌐 Frontend
  { name: "HTML5", icon: "logos:html-5", color: "text-orange-600" },
  { name: "CSS3", icon: "logos:css-3", color: "text-blue-600" },
  { name: "JavaScript", icon: "logos:javascript", color: "text-yellow-500" },
  { name: "TypeScript", icon: "logos:typescript-icon", color: "text-blue-700" },
  { name: "React", icon: "logos:react", color: "text-cyan-500" },
  { name: "Next.js", icon: "logos:nextjs-icon", color: "text-black" },
  { name: "Vue.js", icon: "logos:vue", color: "text-green-600" },
  { name: "Nuxt.js", icon: "logos:nuxt-icon", color: "text-green-700" },
  { name: "Angular", icon: "logos:angular-icon", color: "text-red-600" },
  { name: "Svelte", icon: "logos:svelte-icon", color: "text-orange-500" },
  { name: "SvelteKit", icon: "logos:svelte-icon", color: "text-orange-600" },
  { name: "SolidJS", icon: "logos:solidjs-icon", color: "text-blue-500" },
  { name: "Astro", icon: "logos:astro-icon", color: "text-purple-600" },
  { name: "Qwik", icon: "logos:qwik-icon", color: "text-purple-500" },
  { name: "Vite", icon: "logos:vitejs", color: "text-yellow-600" },
  { name: "Webpack", icon: "logos:webpack", color: "text-blue-400" },
  { name: "Parcel", icon: "logos:parcel-icon", color: "text-brown-500" },
  { name: "Rollup", icon: "logos:rollup", color: "text-red-500" },
  { name: "Babel", icon: "logos:babel", color: "text-yellow-600" },
  {
    name: "Tailwind CSS",
    icon: "logos:tailwindcss-icon",
    color: "text-teal-500",
  },
  { name: "Bootstrap", icon: "logos:bootstrap", color: "text-purple-600" },
  {
    name: "Material UI (MUI)",
    icon: "logos:material-ui",
    color: "text-blue-600",
  },
  { name: "Ant Design", icon: "logos:ant-design", color: "text-red-500" },
  { name: "Chakra UI", icon: "simple-icons:chakraui", color: "text-teal-600" },
  { name: "Shadcn UI", icon: "simple-icons:shadcnui", color: "text-gray-700" },
  { name: "Radix UI", icon: "simple-icons:radixui", color: "text-black" },
  {
    name: "Styled Components",
    icon: "skill-icons:styledcomponents",
    color: "text-pink-500",
  },
  { name: "Emotion", icon: "simple-icons:emotion", color: "text-purple-500" },
  { name: "Sass (SCSS)", icon: "logos:sass", color: "text-pink-600" },
  { name: "Less", icon: "logos:less", color: "text-blue-500" },
  { name: "PostCSS", icon: "logos:postcss", color: "text-pink-400" },
  { name: "Redux", icon: "logos:redux", color: "text-purple-600" },
  { name: "Redux Toolkit", icon: "logos:redux", color: "text-purple-700" },
  { name: "Zustand", icon: "simple-icons:zustand", color: "text-black" },
  { name: "Recoil", icon: "simple-icons:recoil", color: "text-blue-500" },
  { name: "Jotai", icon: "simple-icons:jotai", color: "text-green-500" },
  { name: "MobX", icon: "logos:mobx", color: "text-pink-500" },
  {
    name: "React Query (TanStack Query)",
    icon: "logos:react-query-icon",
    color: "text-red-600",
  },
  { name: "SWR", icon: "logos:swr", color: "text-gray-700" },
  {
    name: "Apollo Client",
    icon: "logos:apollostack",
    color: "text-purple-500",
  },
  { name: "GraphQL", icon: "logos:graphql", color: "text-pink-600" },
  { name: "Framer Motion", icon: "logos:framer", color: "text-black" },
  { name: "GSAP", icon: "logos:greensock-icon", color: "text-green-600" },
  { name: "Three.js", icon: "logos:threejs", color: "text-gray-700" },
  {
    name: "React Three Fiber",
    icon: "simple-icons:threedotjs",
    color: "text-black",
  },
  { name: "D3.js", icon: "logos:d3", color: "text-orange-600" },
  { name: "Chart.js", icon: "simple-icons:chartdotjs", color: "text-red-500" },
  {
    name: "ECharts",
    icon: "simple-icons:apacheecharts",
    color: "text-green-500",
  },
  { name: "Storybook", icon: "logos:storybook-icon", color: "text-pink-600" },
  { name: "Cypress", icon: "logos:cypress-icon", color: "text-gray-700" },
  { name: "Playwright", icon: "logos:playwright", color: "text-green-600" },
  { name: "Jest", icon: "logos:jest", color: "text-red-500" },
  { name: "Vitest", icon: "logos:vitest", color: "text-yellow-600" },
  {
    name: "Testing Library",
    icon: "simple-icons:testinglibrary",
    color: "text-red-600",
  },
  { name: "ESLint", icon: "logos:eslint", color: "text-purple-600" },
  { name: "Prettier", icon: "logos:prettier", color: "text-black" },
  { name: "Husky", icon: "simple-icons:husky", color: "text-brown-600" },
  {
    name: "Lint-staged",
    icon: "simple-icons:lintstaged",
    color: "text-orange-500",
  },
  { name: "PWA", icon: "logos:pwa", color: "text-blue-500" },
  {
    name: "Web Components",
    icon: "simple-icons:webcomponentsdotorg",
    color: "text-blue-600",
  },

  // 🧠 Backend
  { name: "Node.js", icon: "logos:nodejs-icon", color: "text-green-600" },
  {
    name: "Express",
    icon: "skill-icons:expressjs-light",
    color: "text-gray-700",
  },
  { name: "Fastify", icon: "logos:fastify-icon", color: "text-white" },
  { name: "NestJS", icon: "logos:nestjs", color: "text-red-600" },
  { name: "AdonisJS", icon: "logos:adonisjs-icon", color: "text-purple-600" },
  { name: "Hapi", icon: "simple-icons:hapi", color: "text-orange-500" },
  { name: "Koa", icon: "logos:koa", color: "text-green-500" },
  { name: "Bun", icon: "logos:bun", color: "text-brown-600" },
  { name: "Deno", icon: "logos:deno", color: "text-black" },
  { name: "Java", icon: "logos:java", color: "text-red-600" },
  { name: "Spring Boot", icon: "logos:spring-icon", color: "text-green-600" },
  { name: "Spring Cloud", icon: "logos:spring-icon", color: "text-green-700" },
  { name: "Quarkus", icon: "logos:quarkus-icon", color: "text-purple-600" },
  { name: "Micronaut", icon: "logos:micronaut-icon", color: "text-blue-500" },
  { name: "Kotlin", icon: "logos:kotlin-icon", color: "text-purple-700" },
  { name: "Ktor", icon: "simple-icons:ktor", color: "text-black" },
  { name: "C#", icon: "logos:c-sharp", color: "text-purple-600" },
  { name: ".NET", icon: "logos:dotnet", color: "text-purple-700" },
  { name: "ASP.NET Core", icon: "logos:dotnet", color: "text-blue-600" },
  { name: "Python", icon: "logos:python", color: "text-yellow-500" },
  { name: "Django", icon: "logos:django-icon", color: "text-green-700" },
  {
    name: "Django Rest Framework",
    icon: "logos:django-icon",
    color: "text-green-600",
  },
  { name: "Flask", icon: "logos:flask", color: "text-black" },
  { name: "FastAPI", icon: "logos:fastapi-icon", color: "text-teal-600" },
  { name: "Pyramid", icon: "simple-icons:pylon", color: "text-orange-500" },
  { name: "Ruby", icon: "logos:ruby", color: "text-red-600" },
  { name: "Ruby on Rails", icon: "logos:rails", color: "text-red-700" },
  { name: "Sinatra", icon: "logos:sinatra", color: "text-black" },
  { name: "PHP", icon: "logos:php", color: "text-purple-600" },
  { name: "Laravel", icon: "logos:laravel", color: "text-red-600" },
  { name: "Symfony", icon: "logos:symfony", color: "text-black" },
  {
    name: "CodeIgniter",
    icon: "logos:codeigniter-icon",
    color: "text-red-500",
  },
  { name: "CakePHP", icon: "logos:cakephp-icon", color: "text-red-600" },
  { name: "Go", icon: "logos:go", color: "text-cyan-500" },
  { name: "Gin", icon: "logos:go", color: "text-cyan-600" },
  { name: "Fiber", icon: "logos:go", color: "text-cyan-700" },
  { name: "Echo", icon: "logos:go", color: "text-cyan-400" },
  { name: "Rust", icon: "logos:rust", color: "text-orange-600" },
  { name: "Actix", icon: "simple-icons:actix", color: "text-black" },
  { name: "Axum", icon: "simple-icons:axum", color: "text-orange-500" },
  { name: "Rocket", icon: "logos:rust", color: "text-orange-700" },
  { name: "Elixir", icon: "logos:elixir", color: "text-purple-600" },
  { name: "Phoenix", icon: "logos:phoenix", color: "text-orange-600" },
  { name: "Erlang", icon: "logos:erlang", color: "text-red-600" },
  { name: "Scala", icon: "logos:scala", color: "text-red-600" },
  { name: "Play Framework", icon: "logos:play", color: "text-brown-600" },
  { name: "Groovy", icon: "logos:groovy", color: "text-blue-600" },
  { name: "Grails", icon: "logos:grails", color: "text-green-600" },
  { name: "C", icon: "logos:c", color: "text-blue-600" },
  { name: "C++", icon: "logos:c-plusplus", color: "text-blue-700" },
  { name: "Zig", icon: "logos:zig", color: "text-yellow-500" },
  { name: "Lua", icon: "logos:lua", color: "text-blue-500" },
  { name: "Swift", icon: "logos:swift", color: "text-orange-600" },
  { name: "Vapor", icon: "logos:swift", color: "text-orange-700" },
  { name: "Objective-C", icon: "logos:objectivec", color: "text-blue-600" },
  { name: "Perl", icon: "logos:perl", color: "text-blue-500" },
  { name: "Haskell", icon: "logos:haskell-icon", color: "text-purple-600" },
  { name: "OCaml", icon: "logos:ocaml", color: "text-orange-500" },
  { name: "Crystal", icon: "logos:crystal", color: "text-black" },
  { name: "Nim", icon: "logos:nim-lang", color: "text-yellow-600" },
  { name: "GraphQL Yoga", icon: "logos:graphql", color: "text-pink-600" },
  {
    name: "Apollo Server",
    icon: "logos:apollostack",
    color: "text-purple-500",
  },
  { name: "tRPC", icon: "logos:trpc", color: "text-blue-500" },
  {
    name: "REST",
    icon: "simple-icons:openapiinitiative",
    color: "text-green-500",
  },
  { name: "gRPC", icon: "logos:grpc", color: "text-blue-600" },
  { name: "SOAP", icon: "simple-icons:soap", color: "text-blue-500" },
  { name: "OpenAPI", icon: "logos:openapi-icon", color: "text-green-600" },
  { name: "Swagger", icon: "logos:swagger", color: "text-green-700" },
  { name: "Postman", icon: "logos:postman-icon", color: "text-orange-600" },
  { name: "Insomnia", icon: "logos:insomnia", color: "text-purple-600" },

  // 🗄️ Bancos de Dados
  { name: "PostgreSQL", icon: "logos:postgresql", color: "text-blue-600" },
  { name: "MySQL", icon: "logos:mysql", color: "text-orange-600" },
  { name: "MariaDB", icon: "logos:mariadb-icon", color: "text-blue-500" },
  { name: "SQLite", icon: "logos:sqlite", color: "text-blue-700" },
  { name: "Oracle DB", icon: "logos:oracle", color: "text-red-600" },
  {
    name: "SQL Server",
    icon: "logos:microsoft-sql-server",
    color: "text-red-700",
  },
  { name: "MongoDB", icon: "logos:mongodb-icon", color: "text-green-600" },
  { name: "Redis", icon: "logos:redis", color: "text-red-600" },
  { name: "DynamoDB", icon: "logos:aws-dynamodb", color: "text-orange-600" },
  { name: "Cassandra", icon: "logos:cassandra", color: "text-blue-500" },
  { name: "CouchDB", icon: "logos:couchdb", color: "text-blue-600" },
  { name: "Couchbase", icon: "logos:couchbase", color: "text-green-500" },
  {
    name: "Firebase Firestore",
    icon: "logos:firebase",
    color: "text-yellow-500",
  },
  {
    name: "Firebase Realtime DB",
    icon: "logos:firebase",
    color: "text-yellow-600",
  },
  { name: "Supabase", icon: "logos:supabase-icon", color: "text-green-600" },
  { name: "Neon", icon: "logos:neon-icon", color: "text-black" },
  { name: "PlanetScale", icon: "logos:planetscale", color: "text-black" },
  { name: "CockroachDB", icon: "logos:cockroachdb", color: "text-black" },
  { name: "TimescaleDB", icon: "logos:timescale", color: "text-blue-600" },
  { name: "InfluxDB", icon: "logos:influxdb", color: "text-yellow-500" },
  { name: "ClickHouse", icon: "logos:clickhouse", color: "text-yellow-600" },
  { name: "BigQuery", icon: "logos:google-bigquery", color: "text-green-600" },
  { name: "Snowflake", icon: "logos:snowflake-icon", color: "text-blue-500" },
  {
    name: "Elasticsearch",
    icon: "logos:elasticsearch",
    color: "text-yellow-600",
  },
  { name: "OpenSearch", icon: "logos:opensearch", color: "text-orange-500" },
  { name: "Meilisearch", icon: "logos:meilisearch", color: "text-black" },
  { name: "Algolia", icon: "logos:algolia", color: "text-blue-600" },
  { name: "Solr", icon: "logos:solr", color: "text-blue-500" },
  { name: "Neo4j", icon: "logos:neo4j", color: "text-blue-700" },
  { name: "ArangoDB", icon: "logos:arangodb", color: "text-green-600" },
  { name: "FaunaDB", icon: "logos:fauna", color: "text-green-500" },
  { name: "Realm", icon: "logos:realm", color: "text-green-700" },
  { name: "Prisma", icon: "logos:prisma", color: "text-black" },
  { name: "TypeORM", icon: "logos:typeorm", color: "text-red-600" },
  { name: "Sequelize", icon: "logos:sequelize", color: "text-blue-600" },
  {
    name: "Drizzle ORM",
    icon: "simple-icons:drizzle",
    color: "text-orange-500",
  },
  { name: "MikroORM", icon: "simple-icons:mikroorm", color: "text-pink-500" },
  { name: "Hibernate", icon: "logos:hibernate", color: "text-green-600" },
  { name: "JPA", icon: "logos:java", color: "text-blue-600" },
  { name: "Flyway", icon: "simple-icons:flyway", color: "text-blue-500" },
  { name: "Liquibase", icon: "logos:liquibase", color: "text-blue-600" },
  {
    name: "Supabase Storage",
    icon: "logos:supabase-icon",
    color: "text-green-600",
  },
  { name: "MinIO", icon: "logos:minio", color: "text-orange-600" },
  { name: "Amazon S3", icon: "logos:aws-s3", color: "text-orange-500" },
  {
    name: "Google Cloud Storage",
    icon: "logos:google-cloud",
    color: "text-blue-600",
  },
  { name: "Azure Blob Storage", icon: "logos:azure", color: "text-blue-500" },
  {
    name: "Firebase Storage",
    icon: "logos:firebase",
    color: "text-yellow-500",
  },
  { name: "Redis Streams", icon: "logos:redis", color: "text-red-600" },
  { name: "Kafka Streams", icon: "logos:kafka-icon", color: "text-black" },
  { name: "Mongo Atlas", icon: "logos:mongodb-icon", color: "text-green-600" },

  // ☁️ DevOps, Cloud & Infra
  { name: "Docker", icon: "logos:docker-icon", color: "text-blue-600" },
  { name: "Docker Compose", icon: "logos:docker-icon", color: "text-blue-700" },
  { name: "Kubernetes", icon: "logos:kubernetes", color: "text-blue-500" },
  { name: "Helm", icon: "logos:helm", color: "text-blue-600" },
  { name: "Terraform", icon: "logos:terraform-icon", color: "text-purple-600" },
  { name: "Pulumi", icon: "logos:pulumi-icon", color: "text-orange-500" },
  { name: "Ansible", icon: "logos:ansible", color: "text-red-600" },
  { name: "Vagrant", icon: "logos:vagrant-icon", color: "text-orange-600" },
  { name: "AWS", icon: "logos:aws", color: "text-orange-600" },
  { name: "AWS Lambda", icon: "logos:aws-lambda", color: "text-orange-500" },
  { name: "AWS ECS", icon: "logos:aws-ecs", color: "text-orange-600" },
  { name: "AWS EKS", icon: "logos:aws-eks", color: "text-orange-700" },
  { name: "AWS EC2", icon: "logos:aws-ec2", color: "text-orange-500" },
  { name: "AWS RDS", icon: "logos:aws-rds", color: "text-orange-600" },
  {
    name: "Google Cloud Platform",
    icon: "logos:google-cloud",
    color: "text-blue-600",
  },
  { name: "Cloud Run", icon: "logos:google-cloud-run", color: "text-blue-500" },
  { name: "Firebase", icon: "logos:firebase", color: "text-yellow-500" },
  { name: "Azure", icon: "logos:azure-icon", color: "text-blue-600" },
  {
    name: "Azure Functions",
    icon: "logos:azure-functions",
    color: "text-blue-500",
  },
  {
    name: "DigitalOcean",
    icon: "logos:digital-ocean-icon",
    color: "text-blue-600",
  },
  { name: "Vercel", icon: "logos:vercel-icon", color: "text-black" },
  { name: "Netlify", icon: "logos:netlify-icon", color: "text-teal-600" },
  { name: "Railway", icon: "simple-icons:railway", color: "text-black" },
  { name: "Render", icon: "simple-icons:render", color: "text-blue-500" },
  { name: "Fly.io", icon: "logos:flyio-icon", color: "text-black" },
  { name: "Heroku", icon: "logos:heroku-icon", color: "text-purple-600" },
  {
    name: "Cloudflare",
    icon: "logos:cloudflare-icon",
    color: "text-orange-600",
  },
  {
    name: "Cloudflare Workers",
    icon: "logos:cloudflare-workers-icon",
    color: "text-orange-500",
  },
  { name: "Nginx", icon: "logos:nginx", color: "text-green-600" },
  { name: "Apache", icon: "logos:apache", color: "text-red-600" },
  { name: "Traefik", icon: "logos:traefik-icon", color: "text-blue-600" },
  { name: "HAProxy", icon: "simple-icons:haproxy", color: "text-yellow-500" },
  { name: "PM2", icon: "simple-icons:pm2", color: "text-blue-500" },
  { name: "GitHub Actions", icon: "logos:github-actions", color: "text-black" },
  { name: "GitLab CI", icon: "logos:gitlab", color: "text-orange-600" },
  {
    name: "Bitbucket Pipelines",
    icon: "logos:bitbucket",
    color: "text-blue-600",
  },
  { name: "Jenkins", icon: "logos:jenkins", color: "text-black" },
  { name: "ArgoCD", icon: "logos:argo-icon", color: "text-blue-500" },
  { name: "FluxCD", icon: "logos:flux-icon", color: "text-gray-700" },
  { name: "Prometheus", icon: "logos:prometheus", color: "text-orange-600" },
  { name: "Grafana", icon: "logos:grafana", color: "text-orange-500" },
  { name: "Datadog", icon: "logos:datadog", color: "text-purple-600" },
  { name: "New Relic", icon: "logos:new-relic-icon", color: "text-blue-600" },
  { name: "Sentry", icon: "logos:sentry-icon", color: "text-orange-600" },
  { name: "Logstash", icon: "logos:logstash", color: "text-orange-500" },
  { name: "Kibana", icon: "logos:kibana", color: "text-pink-600" },
  {
    name: "Elastic Stack (ELK)",
    icon: "logos:elasticsearch",
    color: "text-yellow-600",
  },
  {
    name: "OpenTelemetry",
    icon: "logos:opentelemetry-icon",
    color: "text-purple-500",
  },
  { name: "Jaeger", icon: "logos:jaegertracing", color: "text-black" },
  { name: "Loki", icon: "logos:grafana", color: "text-orange-500" },
  { name: "Consul", icon: "logos:consul", color: "text-yellow-500" },
  { name: "Vault", icon: "logos:vault-icon", color: "text-yellow-600" },
  { name: "Istio", icon: "logos:istio", color: "text-blue-500" },
  { name: "Linkerd", icon: "logos:linkerd", color: "text-blue-600" },
  {
    name: "Serverless Framework",
    icon: "logos:serverless",
    color: "text-red-600",
  },
  { name: "SST", icon: "logos:sst-icon", color: "text-orange-500" },
  { name: "Nx", icon: "logos:nx", color: "text-black" },
  { name: "Turborepo", icon: "logos:turborepo-icon", color: "text-gray-700" },
  { name: "Monorepo", icon: "medium", color: "text-black" },
  {
    name: "Microservices",
    icon: "carbon:microservices-1",
    color: "text-blue-500",
  },

  // 📱 Mobile, Desktop, Games & Outros
  { name: "React Native", icon: "logos:react", color: "text-cyan-500" },
  { name: "Expo", icon: "logos:expo-icon", color: "text-black" },
  { name: "Flutter", icon: "logos:flutter", color: "text-blue-600" },
  { name: "Dart", icon: "logos:dart", color: "text-blue-700" },
  { name: "SwiftUI", icon: "logos:swift", color: "text-orange-600" },
  { name: "UIKit", icon: "logos:apple", color: "text-gray-700" },
  {
    name: "Kotlin Android",
    icon: "logos:kotlin-icon",
    color: "text-purple-700",
  },
  {
    name: "Jetpack Compose",
    icon: "logos:android-icon",
    color: "text-green-600",
  },
  { name: "Ionic", icon: "logos:ionic-icon", color: "text-blue-600" },
  { name: "Capacitor", icon: "logos:capacitorjs-icon", color: "text-blue-500" },
  { name: "Cordova", icon: "logos:cordova", color: "text-green-600" },
  { name: "Electron", icon: "logos:electron", color: "text-blue-600" },
  { name: "Tauri", icon: "logos:tauri", color: "text-yellow-500" },
  {
    name: "Neutralino",
    icon: "simple-icons:neutralinojs",
    color: "text-blue-500",
  },
  { name: "Qt", icon: "logos:qt", color: "text-green-600" },
  { name: "JavaFX", icon: "logos:java", color: "text-red-600" },
  { name: "WPF", icon: "logos:dotnet", color: "text-purple-600" },
  { name: "MAUI", icon: "logos:dotnet", color: "text-purple-700" },
  { name: "Unity", icon: "logos:unity", color: "text-gray-700" },
  {
    name: "Unreal Engine",
    icon: "logos:unreal-engine",
    color: "text-gray-600",
  },
  { name: "Godot", icon: "logos:godot-icon", color: "text-blue-600" },
  { name: "Phaser", icon: "logos:phaser", color: "text-red-600" },
  { name: "PlayCanvas", icon: "logos:playcanvas", color: "text-blue-500" },
  { name: "Blender", icon: "logos:blender", color: "text-orange-600" },
  { name: "OpenGL", icon: "logos:opengl", color: "text-blue-600" },
  { name: "Vulkan", icon: "logos:vulkan", color: "text-gray-700" },
  { name: "DirectX", icon: "simple-icons:directx", color: "text-blue-500" },
  { name: "WebGL", icon: "logos:webgl", color: "text-blue-600" },
  { name: "WebGPU", icon: "logos:w3c", color: "text-black" },
  { name: "Arduino", icon: "logos:arduino", color: "text-blue-600" },
  { name: "Raspberry Pi", icon: "logos:raspberry-pi", color: "text-red-600" },
  { name: "ESP32", icon: "logos:espressif", color: "text-black" },
  { name: "ROS", icon: "logos:ros", color: "text-blue-500" },
  { name: "TensorFlow", icon: "logos:tensorflow", color: "text-orange-600" },
  { name: "PyTorch", icon: "logos:pytorch-icon", color: "text-red-600" },
  { name: "Keras", icon: "logos:keras", color: "text-red-500" },
  {
    name: "Scikit-learn",
    icon: "logos:scikit-learn",
    color: "text-orange-500",
  },
  { name: "Pandas", icon: "logos:pandas-icon", color: "text-blue-600" },
  { name: "NumPy", icon: "logos:numpy", color: "text-blue-700" },
  { name: "Jupyter", icon: "logos:jupyter", color: "text-orange-600" },
  { name: "OpenCV", icon: "logos:opencv", color: "text-red-600" },
  {
    name: "LangChain",
    icon: "simple-icons:langchain",
    color: "text-green-500",
  },
  { name: "OpenAI API", icon: "logos:openai-icon", color: "text-black" },
  {
    name: "Hugging Face",
    icon: "logos:hugging-face-icon",
    color: "text-yellow-500",
  },
  {
    name: "Stable Diffusion",
    icon: "simple-icons:stabilityai",
    color: "text-purple-500",
  },
  { name: "Kafka", icon: "logos:kafka-icon", color: "text-black" },
  { name: "RabbitMQ", icon: "logos:rabbitmq-icon", color: "text-orange-600" },
  {
    name: "ActiveMQ",
    icon: "simple-icons:apacheactivemq",
    color: "text-red-500",
  },
  { name: "BullMQ", icon: "simple-icons:bullmq", color: "text-red-600" },
  { name: "Celery", icon: "simple-icons:celery", color: "text-green-600" },
  { name: "Sidekiq", icon: "simple-icons:sidekiq", color: "text-red-500" },
  { name: "Temporal", icon: "logos:temporal-icon", color: "text-blue-500" },
  { name: "Airflow", icon: "logos:airflow-icon", color: "text-orange-500" },
  {
    name: "Supabase Auth",
    icon: "logos:supabase-icon",
    color: "text-green-600",
  },
  { name: "Auth0", icon: "logos:auth0-icon", color: "text-black" },
  { name: "Keycloak", icon: "logos:keycloak", color: "text-orange-500" },
  { name: "Firebase Auth", icon: "logos:firebase", color: "text-yellow-500" },
  { name: "OAuth 2.0", icon: "logos:oauth", color: "text-blue-600" },
  { name: "JWT", icon: "logos:jwt-icon", color: "text-purple-600" },
  {
    name: "WebSockets",
    icon: "simple-icons:socketdotio",
    color: "text-gray-700",
  },
];

const AddTechDialog: React.FC<AddTechDialogProps> = ({
  open,
  onOpenChange,
  onAdd,
}) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<TechOption | null>(null);

  const filtered = TECH_OPTIONS.filter((tech) =>
    tech.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    const base =
      selected ||
      (search.trim()
        ? { name: search.trim(), icon: "lucide:code-2", color: "text-gray-700" }
        : null);

    if (!base) return;

    onAdd({
      id: Date.now().toString(),
      techStackId: "",
      name: base.name,
      icon: base.icon,
      color: base.color || "text-gray-700",
      ordem: 0,
    });

    setSearch("");
    setSelected(null);
    onOpenChange(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSearch("");
      setSelected(null);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#18181b] border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Adicionar tecnologia</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tecnologia (ex: React, Python)..."
            className="bg-black/40 border-gray-800 text-white"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
            {filtered.map((tech) => (
              <button
                key={tech.name}
                onClick={() => setSelected(tech)}
                className={`flex items-center gap-2 p-2 rounded-xl border border-white/5 bg-[#0f0f12] hover:border-yellow-500/40 transition-colors ${
                  selected?.name === tech.name ? "border-yellow-500/60" : ""
                }`}
              >
                <TechIcon
                  icon={tech.icon}
                  size={22}
                  className={tech.color || "text-gray-300"}
                />
                <span className="text-sm text-gray-200 text-left">
                  {tech.name}
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-sm text-gray-500">
                Nenhuma tecnologia encontrada.
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-end">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              className="text-gray-400"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-yellow-500 text-black hover:bg-yellow-600"
            >
              Adicionar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TechStack: React.FC<TechStackProps> = ({ data, onAdd, onRemove }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
        Tech Stack
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {(!data || data.length === 0) && (
          <span className="text-gray-500 text-sm">
            No technologies added yet.
          </span>
        )}
        {data &&
          data.map((tech) => (
            <span
              key={tech.id || tech.name}
              className="group px-4 py-2 bg-[#18181b] hover:bg-[#202025] text-gray-300 font-medium rounded-xl border border-white/5 hover:border-yellow-500/30 transition-all cursor-default text-sm flex items-center gap-2"
            >
              <TechIcon
                icon={tech.icon || "lucide:code-2"}
                size={18}
                className={tech.color || "text-yellow-400"}
              />
              <span className="group-hover:text-white">{tech.name}</span>
              {onRemove && (
                <button
                  onClick={() => onRemove(tech)}
                  className="hover:text-red-500 hidden group-hover:inline-block"
                >
                  <X size={14} />
                </button>
              )}
            </span>
          ))}
      </div>

      {onAdd && (
        <>
          <Button
            size="sm"
            onClick={() => setIsDialogOpen(true)}
            className="bg-yellow-500 text-black hover:bg-yellow-600 h-9 flex items-center gap-2"
          >
            <Plus size={16} />
            Adicionar tecnologia
          </Button>
          <AddTechDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onAdd={onAdd}
          />
        </>
      )}
    </div>
  );
};

// ==========================================
// DATA MAPPING HELPERS
// ==========================================

const convertToSocialLink = (social: Social): SocialLink => {
  const platform = social.plataforma.toLowerCase();

  const getIcon = (plat: string): LucideIcon => {
    const icons: Record<string, LucideIcon> = {
      github: Github,
      linkedin: Linkedin,
      instagram: Instagram,
      youtube: Youtube,
      twitter: Twitter,
      facebook: Facebook,
      figma: Figma,
      email: Mail,
      dev: Code2,
    };
    return icons[plat] || Mail;
  };

  const getColorClass = (plat: string): string => {
    const colors: Record<string, string> = {
      github: "bg-[#18181b] hover:bg-[#27272a] border border-gray-800",
      email: "bg-[#1e293b] hover:bg-[#263345]",
      facebook: "bg-[#3b82f6] hover:bg-[#2563eb]",
      figma: "bg-[#1e1e1e] hover:bg-[#2d2d2d]",
      dev: "bg-white hover:bg-gray-100",
      linkedin: "bg-[#0077b5] hover:bg-[#006399]",
      instagram:
        "bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600",
    };
    return colors[plat] || "bg-[#121318] hover:bg-[#18181b]";
  };

  return {
    id: social.id?.toString() || platform,
    name: social.plataforma,
    handle: social.url.replace("https://", "").replace("http://", ""),
    icon: getIcon(platform),
    url: social.url,
    colorClass: getColorClass(platform),
    textColorClass: platform === "dev" ? "text-black" : undefined,
    colSpan: platform === "github" ? 2 : 1,
  };
};

// ==========================================
// CONSTANTS
// ==========================================

const DEMO_SOCIAL_LINKS: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    handle: "@m-aqsam",
    icon: Github,
    url: "https://github.com",
    colorClass: "bg-[#18181b] hover:bg-[#27272a] border border-gray-800",
    colSpan: 2,
  },
  {
    id: "email",
    name: "Email",
    handle: "maqsam1155@gmail.com",
    icon: Mail,
    url: "mailto:maqsam1155@gmail.com",
    colorClass: "bg-[#1e293b] hover:bg-[#263345]",
    colSpan: 1,
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "@m_aqsam",
    icon: Facebook,
    url: "https://facebook.com",
    colorClass: "bg-[#3b82f6] hover:bg-[#2563eb]",
    colSpan: 1,
  },
  {
    id: "figma",
    name: "Figma",
    handle: "@maqsam",
    icon: Figma,
    url: "https://figma.com",
    colorClass: "bg-[#1e1e1e] hover:bg-[#2d2d2d]",
    colSpan: 1,
  },
  {
    id: "dev",
    name: "DEV",
    handle: "@maqsam",
    icon: Code2,
    url: "https://dev.to",
    colorClass: "bg-white hover:bg-gray-100",
    textColorClass: "text-black",
    colSpan: 1,
  },
];

const DEMO_TECH_STACK: Technology[] = TECH_OPTIONS.map((tech, idx) => ({
  id: `demo-${idx}`,
  techStackId: "demo",
  name: tech.name,
  icon: tech.icon,
  color: tech.color || "text-gray-700",
  ordem: idx,
}));

const DEMO_EXPERIENCE_DATA: Experience[] = [
  {
    id: "1",
    role: "Senior Product Designer",
    company: "TechFlow Solutions",
    date: "2023 - Present",
    description:
      "Leading the design system initiative and overseeing product UX for enterprise clients.",
    current: true,
  },
  {
    id: "2",
    role: "Frontend Developer",
    company: "Creative Digital",
    date: "2021 - 2023",
    description:
      "Developed responsive web applications using React and TypeScript. Collaborated closely with UI designers.",
    current: false,
  },
  {
    id: "3",
    role: "UI/UX Intern",
    company: "StartUp Inc",
    date: "2020 - 2021",
    description:
      "Assisted in wireframing and prototyping mobile applications. Conducted user research interviews.",
    current: false,
  },
];

const DEMO_PROJECTS_DATA: Project[] = [
  {
    id: "p1",
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive analytics dashboard for online retailers featuring real-time data visualization.",
    tags: ["React", "Tailwind", "Recharts"],
    link: "#",
  },
  {
    id: "p2",
    title: "HealthTrack App",
    description:
      "Mobile-first fitness tracking application focusing on simplicity and user retention.",
    tags: ["Figma", "UX Research", "Prototyping"],
    link: "#",
  },
  {
    id: "p3",
    title: "Finance AI",
    description:
      "Personal finance assistant powered by generative AI to help users save money.",
    tags: ["TypeScript", "OpenAI API", "Node.js"],
    link: "#",
  },
];

const SOCIAL_OPTIONS = [
  {
    id: "dribbble",
    name: "Dribbble",
    icon: Dribbble,
    colorClass: "bg-[#ea4c89] hover:bg-[#ff5da0]",
    url: "https://dribbble.com/",
  },
  {
    id: "behance",
    name: "Behance",
    icon: Linkedin,
    colorClass: "bg-[#1769ff] hover:bg-[#4080ff]",
    url: "https://behance.net/",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: Pin,
    colorClass: "bg-[#e60023] hover:bg-[#ff1a3c]",
    url: "https://pinterest.com/",
  },
  {
    id: "github",
    name: "GitHub",
    icon: Github,
    colorClass: "bg-[#18181b] hover:bg-[#27272a] border border-gray-800",
    url: "https://github.com/",
  },
  {
    id: "gitlab",
    name: "GitLab",
    icon: Gitlab,
    colorClass: "bg-[#fc6d26] hover:bg-[#fd8c52]",
    url: "https://gitlab.com/",
  },
  {
    id: "bitbucket",
    name: "Bitbucket",
    icon: FolderGit2,
    colorClass: "bg-[#0052cc] hover:bg-[#2684ff]",
    url: "https://bitbucket.org/",
  },
  {
    id: "stackoverflow",
    name: "StackOverflow",
    icon: Code2,
    colorClass: "bg-[#f48024] hover:bg-[#ff9a4d]",
    url: "https://stackoverflow.com/",
  },
  {
    id: "codepen",
    name: "CodePen",
    icon: Codepen,
    colorClass: "bg-black hover:bg-gray-800 border border-gray-800",
    url: "https://codepen.io/",
  },
  {
    id: "dev",
    name: "DEV.to",
    icon: Code2,
    colorClass: "bg-white hover:bg-gray-100",
    textColorClass: "text-black",
    url: "https://dev.to/",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    colorClass: "bg-[#0077b5] hover:bg-[#006399]",
    url: "https://linkedin.com/in/",
  },
  {
    id: "medium",
    name: "Medium",
    icon: Mail,
    colorClass: "bg-white hover:bg-gray-100",
    textColorClass: "text-black",
    url: "https://medium.com/",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    colorClass: "bg-[#FF0000] hover:bg-[#ff3333]",
    url: "https://youtube.com/",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    colorClass:
      "bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600",
    url: "https://instagram.com/",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    colorClass: "bg-[#1877F2] hover:bg-[#3b87f4]",
    url: "https://facebook.com/",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    colorClass: "bg-[#1DA1F2] hover:bg-[#4cb5f5]",
    url: "https://twitter.com/",
  },
  {
    id: "discord",
    name: "Discord",
    icon: MessageCircle,
    colorClass: "bg-[#5865F2] hover:bg-[#7983f5]",
    url: "https://discord.com/",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: Phone,
    colorClass: "bg-[#25D366] hover:bg-[#4ce285]",
    url: "https://wa.me/",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: Send,
    colorClass: "bg-[#0088cc] hover:bg-[#2cabeb]",
    url: "https://t.me/",
  },
  {
    id: "email",
    name: "Email",
    icon: Mail,
    colorClass: "bg-[#1e293b] hover:bg-[#263345]",
    url: "mailto:",
  },
];

// ==========================================
// MAIN COMPONENT (EDITABLE)
// ==========================================

interface EditablePortfolio2Props {
  profile: ProfileComplete;
}

export function EditablePortfolio2({ profile }: EditablePortfolio2Props) {
  const [currentProfile, setCurrentProfile] = useState(profile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);
  const [editUrl, setEditUrl] = useState("");

  const legenda = currentProfile.legendas?.[0];

  const mappedSocials = (currentProfile.social || []).map(convertToSocialLink);
  const socials = mappedSocials;

  const mappedExperience: Experience[] = (currentProfile.workHistory || []).map(
    (work) => {
      // Parse summary to extract role and company
      const summary = work.summary || "";
      let role = work.company; // Default to company field as role
      let company = "";
      let description = summary;

      // Try to parse "Role at Company. Description"
      const atIndex = summary.indexOf(" at ");
      const dotIndex = summary.indexOf(". ");
      if (atIndex > 0 && dotIndex > atIndex) {
        role = summary.substring(0, atIndex).trim();
        company = summary.substring(atIndex + 4, dotIndex).trim();
        description = summary.substring(dotIndex + 2).trim();
      }

      return {
        id: work.id,
        role,
        company,
        date: work.period,
        description,
        current:
          work.period.toLowerCase().includes("present") ||
          work.period.toLowerCase().includes("atua"),
      };
    }
  );
  const experienceData =
    mappedExperience.length > 0 ? mappedExperience : DEMO_EXPERIENCE_DATA;

  const mappedProjects: Project[] = (currentProfile.projetos || []).map(
    (p) => ({
      id: p.id,
      title: p.nome,
      description: p.descricao,
      tags: [],
      link: p.demoLink || p.codeLink,
      image: p.gif,
    })
  );
  const projectsData =
    mappedProjects.length > 0 ? mappedProjects : DEMO_PROJECTS_DATA;

  const mappedTechStack: Technology[] =
    currentProfile.techStack?.technologies?.map((t, idx) => ({
      ...t,
      color: t.color || "text-gray-700",
      ordem: t.ordem ?? idx,
    })) || [];
  const techStackData =
    mappedTechStack.length > 0 ? mappedTechStack : DEMO_TECH_STACK;

  const handleResumeUpdate = async (resumeUrl: string) => {
    if (!currentProfile.footer) return;
    try {
      await footerApi.update(currentProfile.footer.id, {
        ...currentProfile.footer,
        resumeUrl,
      });
      setCurrentProfile({
        ...currentProfile,
        footer: { ...currentProfile.footer, resumeUrl },
      });
      toast.success("Updated!");
    } catch (e) {
      toast.error("Error");
    }
  };

  const handleProfileUpdate = async (field: string, value: string) => {
    if (!legenda) return;
    const updatedLegenda = { ...legenda, [field]: value };
    setCurrentProfile({ ...currentProfile, legendas: [updatedLegenda] });
    try {
      await legendaApi.update(legenda.id, { [field]: value });
      toast.success("Updated");
    } catch (e) {
      toast.error("Error");
    }
  };

  const handleFooterUpdate = async (field: string, value: string) => {
    if (!currentProfile.footer) return;
    const updatedFooter = { ...currentProfile.footer, [field]: value };
    setCurrentProfile({ ...currentProfile, footer: updatedFooter });
    try {
      await footerApi.update(currentProfile.footer.id, { [field]: value });
      toast.success("Updated");
    } catch (e) {
      toast.error("Error");
    }
  };

  const openSocialEdit = (link: SocialLink) => {
    setEditingSocial(link);
    const isReal = currentProfile.social?.some((s) => s.url === link.url);
    setEditUrl(isReal ? link.url : "");
    setIsEditModalOpen(true);
  };

  const saveSocialEdit = async () => {
    if (!editingSocial) return;

    try {
      const newSocials = [...(currentProfile.social || [])];

      // Normalize URL - add https:// if missing (except for mailto: and tel:)
      let normalizedUrl = editUrl.trim();
      if (
        normalizedUrl &&
        !normalizedUrl.match(/^(https?:\/\/|mailto:|tel:)/i)
      ) {
        normalizedUrl = "https://" + normalizedUrl;
      }

      const existingIndex = newSocials.findIndex(
        (s) =>
          s.plataforma.toLowerCase() === editingSocial.name.toLowerCase() ||
          s.id.toString() === editingSocial.id
      );

      if (existingIndex >= 0) {
        // Update existing social
        const existingSocial = newSocials[existingIndex];
        await socialApi.update(existingSocial.id, {
          plataforma: editingSocial.name.toLowerCase() as any,
          url: normalizedUrl,
        });
        newSocials[existingIndex] = {
          ...newSocials[existingIndex],
          plataforma: editingSocial.name.toLowerCase() as any,
          url: normalizedUrl,
        };
      } else {
        // Create new social
        const newSocial = await socialApi.create({
          profileId: currentProfile.id,
          plataforma: editingSocial.name.toLowerCase() as any,
          url: normalizedUrl,
          ordem: newSocials.length,
        });
        newSocials.push({
          id: newSocial.id,
          plataforma: editingSocial.name.toLowerCase() as any,
          url: normalizedUrl,
          profileId: currentProfile.id,
          ordem: newSocials.length,
        });
      }

      setCurrentProfile({ ...currentProfile, social: newSocials });
      setIsEditModalOpen(false);
      toast.success("Social media link saved!");
    } catch (error) {
      console.error("Error saving social media:", error);
      toast.error("Failed to save social media link");
    }
  };

  const deleteSocial = async () => {
    if (!editingSocial) return;

    try {
      // Find the social to delete
      const socialToDelete = currentProfile.social?.find(
        (s) =>
          s.plataforma.toLowerCase() === editingSocial.name.toLowerCase() ||
          s.id.toString() === editingSocial.id
      );

      if (socialToDelete) {
        await socialApi.delete(socialToDelete.id);
      }

      const newSocials = (currentProfile.social || []).filter(
        (s) =>
          s.plataforma.toLowerCase() !== editingSocial.name.toLowerCase() &&
          s.id.toString() !== editingSocial.id
      );
      setCurrentProfile({ ...currentProfile, social: newSocials });
      setIsEditModalOpen(false);
      toast.success("Social media link removed!");
    } catch (error) {
      console.error("Error deleting social media:", error);
      toast.error("Failed to remove social media link");
    }
  };

  const handleAddNewFromChip = (optionId: string) => {
    const option = SOCIAL_OPTIONS.find((o) => o.id === optionId);
    if (!option) return;

    const tempLink: SocialLink = {
      id: option.id,
      name: option.name,
      handle: option.id,
      icon: option.icon,
      url: "",
      colorClass: option.colorClass,
    };
    openSocialEdit(tempLink);
  };

  const handleAddTech = async (newTech: Technology) => {
    const currentTechs = currentProfile.techStack?.technologies || [];
    const newTechObj: Technology = {
      ...newTech,
      id: newTech.id || Date.now().toString(),
      techStackId: currentProfile.techStack?.id || "",
      color: newTech.color || "text-gray-700",
      ordem: currentTechs.length,
    };
    const newTechnologies = [...currentTechs, newTechObj];

    const updatedTechStack = {
      title: currentProfile.techStack?.title || "Tech Stack",
      subtitle: currentProfile.techStack?.subtitle || "Technologies I use",
      ...currentProfile.techStack,
      technologies: newTechnologies,
    };
    setCurrentProfile({
      ...currentProfile,
      techStack: updatedTechStack as any,
    });

    try {
      const payload = {
        title: updatedTechStack.title,
        subtitle: updatedTechStack.subtitle,
        technologies: newTechnologies.map((t, idx) => ({
          name: t.name,
          icon: t.icon,
          color: t.color || "text-gray-700",
          ordem: idx,
        })),
      };

      if (!currentProfile.techStack?.id) {
        await techStackApi.create(currentProfile.id, payload);
      } else {
        await techStackApi.update(currentProfile.id, payload);
      }
      toast.success("Tech added");
    } catch (e) {
      toast.error("Error adding tech");
    }
  };

  const handleRemoveTech = async (techToRemove: Technology) => {
    const currentTechs = currentProfile.techStack?.technologies || [];
    const newTechnologies = currentTechs.filter((t) =>
      t.id ? t.id !== techToRemove.id : t.name !== techToRemove.name
    );

    const updatedTechStack = {
      title: currentProfile.techStack?.title || "Tech Stack",
      subtitle: currentProfile.techStack?.subtitle || "Technologies I use",
      ...currentProfile.techStack,
      technologies: newTechnologies,
    };
    setCurrentProfile({
      ...currentProfile,
      techStack: updatedTechStack as any,
    });

    try {
      if (currentProfile.techStack?.id) {
        const payload = {
          title: updatedTechStack.title,
          subtitle: updatedTechStack.subtitle,
          technologies: newTechnologies.map((t, idx) => ({
            name: t.name,
            icon: t.icon,
            color: t.color || "text-gray-700",
            ordem: idx,
          })),
        };
        await techStackApi.update(currentProfile.id, payload);
        toast.success("Tech removed");
      }
    } catch (e) {
      toast.error("Error removing tech");
    }
  };

  /* EXP STATE */
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [expForm, setExpForm] = useState({
    role: "",
    company: "",
    date: "",
    description: "",
    current: false,
  });

  /* EXP HANDLERS */
  const openExpAdd = () => {
    setEditingExp(null);
    setExpForm({
      role: "",
      company: "",
      date: "",
      description: "",
      current: false,
    });
    setIsExpModalOpen(true);
  };

  const openExpEdit = (exp: Experience) => {
    setEditingExp(exp);
    setExpForm({
      role: exp.role,
      company: exp.company,
      date: exp.date,
      description: exp.description,
      current: exp.current || false,
    });
    setIsExpModalOpen(true);
  };

  // Duplicate handleSaveExp implementation removed; using the later correct version

  const handleSaveExp = async () => {
    const summaryText = expForm.company
      ? `${expForm.role} at ${expForm.company}. ${expForm.description}`.trim()
      : `${expForm.role}. ${expForm.description}`.trim();

    const newWork = {
      company: expForm.role || "Position",
      period: expForm.date || "Date",
      summary: summaryText,
      ordem: 0, // Default
      technologies: [], // Default empty
      responsibilities: [], // Default empty
    };

    try {
      if (editingExp) {
        await workExperienceApi.update(editingExp.id, newWork);
        toast.success("Experience updated");
      } else {
        await workExperienceApi.create({
          ...newWork,
          profileId: currentProfile.id,
        });
        toast.success("Experience added");
      }

      // Optimistic UI Update
      // NOTE: Ideal would be to re-fetch profile, but we will patch local state to avoid flicker/reload
      const summaryText = expForm.company
        ? `${expForm.role} at ${expForm.company}. ${expForm.description}`.trim()
        : `${expForm.role}. ${expForm.description}`.trim();

      const newExpUI: Experience = {
        id: editingExp?.id || Date.now().toString(),
        role: expForm.role,
        company: expForm.company,
        date: expForm.date,
        description: expForm.description,
        current: expForm.current,
      };

      // Re-mapping logic for local state consistency
      const newBackendWork = {
        id: newExpUI.id,
        company: newExpUI.role, // Position goes to company field
        position: newExpUI.role,
        period: newExpUI.date,
        summary: summaryText,
        current: newExpUI.current,
      };

      const currentList = currentProfile.workHistory || [];
      let newList;
      if (editingExp) {
        newList = currentList.map((item) =>
          item.id === editingExp.id ? { ...item, ...newBackendWork } : item
        );
      } else {
        newList = [
          ...currentList,
          { ...newBackendWork, profileId: currentProfile.id },
        ];
      }

      setCurrentProfile({ ...currentProfile, workHistory: newList as any });
      setIsExpModalOpen(false);
    } catch (e) {
      toast.error("Error saving experience");
    }
  };

  const handleDeleteExp = async () => {
    if (!editingExp) return;
    try {
      await workExperienceApi.delete(editingExp.id);
      const newList = (currentProfile.workHistory || []).filter(
        (i) => i.id !== editingExp.id
      );
      setCurrentProfile({ ...currentProfile, workHistory: newList });
      setIsExpModalOpen(false);
      toast.success("Deleted");
    } catch (e) {
      toast.error("Error deleting");
    }
  };

  /* PROJECTS STATE */
  const [isProjModalOpen, setIsProjModalOpen] = useState(false);
  const [editingProj, setEditingProj] = useState<Projeto | null>(null);
  const [projForm, setProjForm] = useState({
    title: "",
    description: "",
    githubUrl: "",
    deployUrl: "",
    thumbnail: "",
    technologies: "",
  });

  /* PROJECTS HANDLERS */
  const openProjAdd = () => {
    setEditingProj(null);
    setProjForm({
      title: "",
      description: "",
      githubUrl: "",
      deployUrl: "",
      thumbnail: "",
      technologies: "",
    });
    setIsProjModalOpen(true);
  };

  // Adjusted to accept UI 'Project' type and find internal backend 'Projeto'
  const openProjEdit = (projUI: Project) => {
    // Find the original backend object
    const original = (currentProfile.projetos || []).find(
      (p) => p.id === projUI.id
    );

    if (original) {
      setEditingProj(original);
      setProjForm({
        title: original.nome || "",
        description: original.descricao || "",
        githubUrl: original.codeLink || "",
        deployUrl: original.demoLink || "",
        thumbnail: original.gif || "",
        technologies: "",
      });
      setIsProjModalOpen(true);
    } else {
      // Fallback if not found (should not happen usually)
      toast.error("Could not find project data");
    }
  };

  const handleSaveProj = async () => {
    // Helper function to validate URL
    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    // Create DTO payload - only include fields that have values
    const payload: any = {
      nome: projForm.title || "Project Title",
      descricao: projForm.description || "Project Description",
    };

    // Only include optional URL fields if they have valid URLs
    if (projForm.githubUrl?.trim() && isValidUrl(projForm.githubUrl.trim())) {
      payload.codeLink = projForm.githubUrl.trim();
    }

    if (projForm.deployUrl?.trim() && isValidUrl(projForm.deployUrl.trim())) {
      payload.demoLink = projForm.deployUrl.trim();
    }

    if (projForm.thumbnail?.trim() && isValidUrl(projForm.thumbnail.trim())) {
      payload.gif = projForm.thumbnail.trim();
    }

    try {
      if (editingProj) {
        await projetosApi.update(editingProj.id, payload);
        toast.success("Project updated");
      } else {
        // For create, profileId is required
        const createPayload = { ...payload, profileId: currentProfile.id };
        // Don't send gif field if it's empty - it's optional in the DTO
        await projetosApi.create(createPayload);
        toast.success("Project added");
      }

      // Local State Update
      const newProjUI: Projeto = {
        id: editingProj?.id || Date.now().toString(),
        nome: payload.nome,
        descricao: payload.descricao,
        codeLink: payload.codeLink,
        demoLink: payload.demoLink,
        gif: payload.gif,
        profileId: currentProfile.id,
        ordem: 0,
        createdAt: new Date().toISOString(),
      };

      const currentProjs = currentProfile.projetos || [];
      let newProjsList;
      if (editingProj) {
        newProjsList = currentProjs.map((p) =>
          p.id === editingProj.id ? { ...p, ...newProjUI } : p
        );
      } else {
        newProjsList = [...currentProjs, newProjUI];
      }

      setCurrentProfile({ ...currentProfile, projetos: newProjsList });
      setIsProjModalOpen(false);
    } catch (e: any) {
      console.error("Error saving project:", e.response?.data || e);
      const errorMessage = e.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        toast.error(errorMessage[0]);
      } else {
        toast.error(errorMessage || "Error saving project");
      }
    }
  };

  const handleDeleteProj = async () => {
    if (!editingProj) return;
    try {
      await projetosApi.delete(editingProj.id);
      const newProjsList = (currentProfile.projetos || []).filter(
        (p) => p.id !== editingProj.id
      );
      setCurrentProfile({ ...currentProfile, projetos: newProjsList });
      setIsProjModalOpen(false);
      toast.success("Project deleted");
    } catch (e) {
      toast.error("Error deleting project");
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
            .portfolio-2-scope { font-family: 'Plus Jakarta Sans', sans-serif; }
            .portfolio-2-scope ::-webkit-scrollbar { width: 0px; background: transparent; }
        `}</style>

      {/* PROJECTS EDIT MODAL */}
      <Dialog open={isProjModalOpen} onOpenChange={setIsProjModalOpen}>
        <DialogContent className="sm:max-w-md bg-[#18181b] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>
              {editingProj ? "Edit Project" : "Add Project"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4 max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input
                value={projForm.title}
                onChange={(e) =>
                  setProjForm({ ...projForm, title: e.target.value })
                }
                placeholder="Project Title"
                className="bg-black/50 border-gray-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Short Description</Label>
              <Textarea
                value={projForm.description}
                onChange={(e) =>
                  setProjForm({ ...projForm, description: e.target.value })
                }
                placeholder="What does it do?"
                className="bg-black/50 border-gray-700"
                rows={3}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Github URL</Label>
              <Input
                value={projForm.githubUrl}
                onChange={(e) =>
                  setProjForm({ ...projForm, githubUrl: e.target.value })
                }
                placeholder="https://github.com/..."
                className="bg-black/50 border-gray-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Live URL (Optional)</Label>
              <Input
                value={projForm.deployUrl}
                onChange={(e) =>
                  setProjForm({ ...projForm, deployUrl: e.target.value })
                }
                placeholder="https://..."
                className="bg-black/50 border-gray-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Technologies (Comma separated)</Label>
              <Input
                value={projForm.technologies}
                onChange={(e) =>
                  setProjForm({ ...projForm, technologies: e.target.value })
                }
                placeholder="React, Node, TypeScript"
                className="bg-black/50 border-gray-700"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between w-full">
            {editingProj ? (
              <Button
                variant="destructive"
                onClick={handleDeleteProj}
                size="sm"
              >
                <Trash2 size={16} className="mr-2" /> Remove
              </Button>
            ) : (
              <div></div>
            )}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsProjModalOpen(false)}
                className="text-gray-400"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveProj}
                className="bg-yellow-500 text-black hover:bg-yellow-600"
              >
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EXPERIENCE EDIT MODAL */}
      <Dialog open={isExpModalOpen} onOpenChange={setIsExpModalOpen}>
        <DialogContent className="sm:max-w-md bg-[#18181b] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>
              {editingExp ? "Edit Experience" : "Add Experience"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>Role / Position</Label>
              <Input
                value={expForm.role}
                onChange={(e) =>
                  setExpForm({ ...expForm, role: e.target.value })
                }
                placeholder="e.g. Senior Developer"
                className="bg-black/50 border-gray-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Company</Label>
              <Input
                value={expForm.company}
                onChange={(e) =>
                  setExpForm({ ...expForm, company: e.target.value })
                }
                placeholder="e.g. Google"
                className="bg-black/50 border-gray-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Period</Label>
              <Input
                value={expForm.date}
                onChange={(e) =>
                  setExpForm({ ...expForm, date: e.target.value })
                }
                placeholder="e.g. 2023 - Present"
                className="bg-black/50 border-gray-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="current"
                  checked={expForm.current}
                  onCheckedChange={(c: boolean) =>
                    setExpForm({ ...expForm, current: c })
                  }
                />
                <Label htmlFor="current">I currently work here</Label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Textarea
                value={expForm.description}
                onChange={(e) =>
                  setExpForm({ ...expForm, description: e.target.value })
                }
                className="bg-black/50 border-gray-700"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between w-full">
            {editingExp ? (
              <Button variant="destructive" onClick={handleDeleteExp} size="sm">
                <Trash2 size={16} className="mr-2" /> Remove
              </Button>
            ) : (
              <div></div>
            )}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsExpModalOpen(false)}
                className="text-gray-400"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveExp}
                className="bg-yellow-500 text-black hover:bg-yellow-600"
              >
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EXISTING SOCIAL MODAL code... */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md bg-[#18181b] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editingSocial ? (
                <>
                  <editingSocial.icon size={20} className="text-yellow-500" />
                  Edit {editingSocial.name}
                </>
              ) : (
                <>
                  <Plus size={20} className="text-yellow-500" />
                  Add Social Media
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            {!editingSocial && (
              <div className="flex flex-col gap-2">
                <Label>Platform</Label>
                <select
                  onChange={(e) => {
                    const platform = e.target.value;
                    const option = SOCIAL_OPTIONS.find(
                      (o) => o.id === platform
                    );
                    if (option) {
                      setEditingSocial({
                        id: platform,
                        name: option.name,
                        handle: "",
                        icon: option.icon,
                        url: "",
                        colorClass: option.colorClass,
                      } as SocialLink);
                    }
                  }}
                  className="bg-black/50 border-gray-700 text-white rounded px-3 py-2"
                >
                  <option value="">Select platform...</option>
                  {SOCIAL_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label>URL / Link</Label>
              <Input
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                placeholder="https://..."
                className="bg-black/50 border-gray-700 text-white"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between w-full">
            {editingSocial &&
            currentProfile.social?.some(
              (s) =>
                s.plataforma === editingSocial.name ||
                s.id.toString() === editingSocial.id
            ) ? (
              <Button variant="destructive" onClick={deleteSocial} size="sm">
                <Trash2 size={16} className="mr-2" /> Remove
              </Button>
            ) : (
              <div></div>
            )}

            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400"
              >
                Cancel
              </Button>
              <Button
                onClick={saveSocialEdit}
                disabled={!editingSocial || !editUrl.trim()}
                className="bg-yellow-500 text-black hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="portfolio-2-scope min-h-screen w-full flex justify-center bg-[#050505] overflow-x-hidden text-slate-200">
        <main className="w-full max-w-md md:max-w-xl lg:max-w-2xl z-10 px-6 py-10 flex flex-col gap-6">
          <div className="bg-[#121318] rounded-[2rem] p-6 sm:p-8 border border-white/5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="flex-shrink-0">
                <Avatar
                  src={
                    legenda?.legendaFoto ||
                    currentProfile.avatarUrl ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Default&backgroundColor=fbbf24"
                  }
                  alt={legenda?.nome || "Profile"}
                />
              </div>
              <div className="flex-1 text-center sm:text-left mt-2">
                <div className="mb-1">
                  <EditableField
                    value={legenda?.nome || "Your Name"}
                    onSave={(val) => handleProfileUpdate("nome", val)}
                    className="text-2xl sm:text-3xl font-bold text-white tracking-tight hover:bg-white/5 p-1 rounded -ml-1"
                  />
                </div>
                <div className="mb-4">
                  <EditableField
                    value={legenda?.titulo || "Your Title"}
                    onSave={(val) => handleProfileUpdate("titulo", val)}
                    className="text-yellow-500 font-medium text-sm hover:bg-yellow-500/10 p-1 rounded -ml-1"
                  />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <User size={16} />
                    <EditableField
                      value={
                        legenda?.subtitulo ||
                        "Building digital products that matter."
                      }
                      onSave={(val) => handleProfileUpdate("subtitulo", val)}
                      className="text-sm hover:bg-white/5 p-1 rounded"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    <EditableField
                      value={legenda?.subtitulo || "Location/Contact"}
                      onSave={(val) => handleProfileUpdate("subtitulo", val)}
                      className="text-sm hover:bg-white/5 p-1 rounded"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <EditableResumeButton
                    resumeUrl={currentProfile.footer?.resumeUrl}
                    onResumeUpdate={handleResumeUpdate}
                    className="from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <section className="grid grid-cols-2 gap-4">
            {socials.map((link, index) => (
              <SocialCard
                key={`${link.id}-${index}`}
                item={link}
                onEdit={() => openSocialEdit(link)}
              />
            ))}
            {/* Add Social Media Button */}
            <button
              onClick={() => {
                setEditingSocial(null);
                setEditUrl("");
                setIsEditModalOpen(true);
              }}
              className="col-span-1 p-6 rounded-3xl border-2 border-dashed border-gray-600 hover:border-yellow-500 bg-[#121318] hover:bg-[#18181b] transition-all duration-300 flex flex-col items-center justify-center gap-3 group"
            >
              <div className="p-3 rounded-xl bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors">
                <Plus size={24} className="text-yellow-500" />
              </div>
              <span className="text-sm font-medium text-gray-400 group-hover:text-yellow-500 transition-colors">
                Add Social
              </span>
            </button>
          </section>

          <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5 mt-8">
            <p className="text-sm text-gray-400 mb-3 font-medium">
              ➕ Add Social Media Profiles:
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAddNewFromChip(option.id)}
                  className={`
                                    flex items-center gap-2 px-3 py-2 rounded-xl border border-white/5 
                                    transition-all duration-200 group bg-[#18181b] hover:scale-105
                                    ${option.colorClass.replace(
                                      "bg-",
                                      "hover:bg-"
                                    )} 
                                `}
                >
                  <option.icon
                    size={16}
                    className="text-gray-300 group-hover:text-white"
                  />
                  <span className="text-xs font-medium text-gray-300 group-hover:text-white">
                    {option.name}
                  </span>
                  <Plus size={12} className="text-gray-500 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {socials.length === 0 && (
            <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5 text-center">
              <p className="text-gray-400 mb-2">
                No social media profiles added yet
              </p>
              <p className="text-sm text-gray-500">
                Add your social media links below to showcase your online
                presence
              </p>
            </div>
          )}

          {/* Experience Section */}
          <ExperienceTimeline
            data={experienceData}
            onEdit={openExpEdit}
            onAdd={openExpAdd}
          />

          <section>
            <div className="flex justify-between items-center mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
                <h2 className="text-xl font-bold text-white">
                  Featured Projects
                </h2>
              </div>
              <Button
                onClick={openProjAdd}
                size="sm"
                variant="ghost"
                className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10"
              >
                <Plus size={16} className="mr-1" /> Add
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(!projectsData || projectsData.length === 0) && (
                <p className="text-gray-500 text-sm ml-2">No projects added.</p>
              )}
              {projectsData.map((project) => (
                <div key={project.id} className="relative group">
                  <ProjectCard project={project} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openProjEdit(project);
                    }}
                    className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <TechStack
            data={techStackData}
            onAdd={handleAddTech}
            onRemove={handleRemoveTech}
          />

          {currentProfile.footer && (
            <footer className="text-center py-8 text-gray-500 text-sm border-t border-white/5 mt-8">
              <div className="flex justify-center items-center gap-2">
                <EditableField
                  value={currentProfile.footer.copyrightName}
                  onSave={(val) => handleFooterUpdate("copyrightName", val)}
                  className="hover:bg-white/5 p-1 rounded"
                />
              </div>
              {currentProfile.footer.madeWith && (
                <div className="mt-2 flex justify-center items-center gap-2">
                  <EditableField
                    value={currentProfile.footer.madeWith}
                    onSave={(val) => handleFooterUpdate("madeWith", val)}
                    className="hover:bg-white/5 p-1 rounded"
                  />
                </div>
              )}
            </footer>
          )}
        </main>
      </div>
    </>
  );
}
