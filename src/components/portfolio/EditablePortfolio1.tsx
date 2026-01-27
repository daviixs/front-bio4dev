import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { EditableHero } from "./EditableHero";
import { EditableResumeButton } from "./EditableResumeButton";
import { WorkHistory } from "../../../Portifolios/portifolio-1/components/WorkHistory";
import { Projects } from "../../../Portifolios/portifolio-1/components/Projects";
import { Footer } from "../../../Portifolios/portifolio-1/components/Footer";
import {
  profileApi,
  legendaApi,
  footerApi,
  techStackApi,
  workExperienceApi,
  projetosApi,
} from "@/lib/api";
import type {
  ProfileComplete,
  Legenda,
  Projeto,
  Technology,
  WorkExperience,
} from "@/types";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TechIcon } from "./TechIcon";

interface EditablePortfolio1Props {
  profile: ProfileComplete;
  onProfileUpdate?: () => void;
}

interface TechStackProps {
  data: Technology[];
  onAdd?: (tech: Technology) => void;
  onRemove?: (tech: Technology) => void;
}

interface TechOption {
  name: string;
  icon: string;
  color?: string;
}

interface AddTechDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (tech: Technology) => void;
}

type LegendaEditableField =
  | "legendaFoto"
  | "greeting"
  | "nome"
  | "titulo"
  | "subtitulo"
  | "descricao";

const TECH_OPTIONS: TechOption[] = [
  // Frontend
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

  // Backend
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

  // Bancos de Dados
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

  // DevOps, Cloud & Infra
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

  // Mobile, Desktop, Games & Outros
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
    tech.name.toLowerCase().includes(search.toLowerCase()),
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
      <DialogContent className="sm:max-w-md bg-white border-slate-200 text-slate-900">
        <DialogHeader>
          <DialogTitle>Adicionar tecnologia</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tecnologia (ex: React, Python)..."
            className="bg-white border-slate-200"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
            {filtered.map((tech) => (
              <button
                key={tech.name}
                onClick={() => setSelected(tech)}
                className={`flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-colors ${
                  selected?.name === tech.name ? "border-blue-500" : ""
                }`}
              >
                <TechIcon
                  icon={tech.icon}
                  size={22}
                  className={tech.color || "text-slate-600"}
                />
                <span className="text-sm text-slate-700 text-left">
                  {tech.name}
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-sm text-slate-500">
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
              className="text-slate-500"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-blue-600 text-white hover:bg-blue-700"
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
    <section id="tech-stack" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <p className="text-gray-600">
            Tecnologias e ferramentas que utilizo no dia a dia
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {(!data || data.length === 0) && (
            <span className="text-slate-500 text-sm">
              Nenhuma tecnologia adicionada ainda.
            </span>
          )}
          {data &&
            data.map((tech) => (
              <span
                key={tech.id || tech.name}
                className="group px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl border border-slate-200 hover:border-blue-300 transition-all cursor-default text-sm flex items-center gap-2"
              >
                <TechIcon
                  icon={tech.icon || "lucide:code-2"}
                  size={18}
                  className={tech.color || "text-blue-500"}
                />
                <span className="group-hover:text-slate-900">{tech.name}</span>
                {onRemove && (
                  <button
                    onClick={() => onRemove(tech)}
                    className="hover:text-rose-500 hidden group-hover:inline-block"
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
              className="bg-blue-600 text-white hover:bg-blue-700 h-9 flex items-center gap-2"
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
    </section>
  );
};

const DEMO_TECH_STACK: Technology[] = TECH_OPTIONS.map((tech, idx) => ({
  id: `demo-${idx}`,
  techStackId: "demo",
  name: tech.name,
  icon: tech.icon,
  color: tech.color || "text-gray-700",
  ordem: idx,
}));

export function EditablePortfolio1({
  profile,
  onProfileUpdate,
}: EditablePortfolio1Props) {
  console.log("EditablePortfolio1 - Profile recebido:", profile);
  console.log("Profile ID:", profile?.id);
  console.log("Profile legendas:", profile?.legendas);

  // Verificação de segurança: garantir que profile seja um objeto válido
  if (!profile || typeof profile !== "object") {
    console.error("Profile inválido recebido:", profile);
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Erro de Dados
          </h2>
          <p className="text-red-500">Os dados do perfil não são válidos.</p>
        </div>
      </div>
    );
  }

  const [currentProfile, setCurrentProfile] =
    useState<ProfileComplete>(profile);
  const [localProfile, setLocalProfile] = useState<ProfileComplete>(profile);
  const legenda = localProfile.legendas?.[0];
  const workHistory = localProfile.workHistory || [];
  const projects = localProfile.projetos || [];

  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isFooterModalOpen, setIsFooterModalOpen] = useState(false);

  const [editingWork, setEditingWork] = useState<WorkExperience | null>(null);
  const [workForm, setWorkForm] = useState({
    company: "",
    period: "",
    summary: "",
    impact: "",
    technologies: "",
    responsibilities: "",
  });

  const [editingProject, setEditingProject] = useState<Projeto | null>(null);
  const [projectForm, setProjectForm] = useState({
    nome: "",
    descricao: "",
    demoLink: "",
    codeLink: "",
    gif: "",
    tags: "",
  });

  const [footerForm, setFooterForm] = useState({
    title: "",
    subtitle: "",
    email: "",
    github: "",
    linkedin: "",
    twitter: "",
    resumeUrl: "",
    copyrightName: "",
    madeWith: "",
  });

  useEffect(() => {
    console.log("EditablePortfolio1 - useEffect profile change:", profile);
    console.log("Profile ID:", profile?.id);
    console.log("Profile legendas:", profile?.legendas);
    setLocalProfile(profile);
    setCurrentProfile(profile);
  }, [profile]);

  // Criar profile se não existir
  useEffect(() => {
    console.log(
      "EditablePortfolio1 - useEffect localProfile.id check:",
      localProfile.id,
    );
    const createProfileIfNeeded = async () => {
      if (localProfile.id) return;

      console.log("Criando profile para edição");
      try {
        // Criar profile básico
        const profileData = {
          username: `user_${Date.now()}`,
          templateType: "template_01" as const,
        };
        const response = await profileApi.create(profileData);

        // Carregar dados completos
        const completeProfile = await profileApi.getComplete(
          response.profile.id,
        );

        console.log("Profile criado e carregado:", completeProfile);
        setLocalProfile(completeProfile);
        setCurrentProfile(completeProfile);
      } catch (error) {
        console.error("Erro ao criar profile:", error);
        toast.error("Erro ao inicializar perfil");
      }
    };

    if (!localProfile.id) {
      createProfileIfNeeded();
    }
  }, [localProfile.id]);

  const handleLegendaUpdate = async (field: LegendaEditableField, value: string) => {
    if (!localProfile.id) {
      toast.error("Perfil não encontrado");
      return;
    }

    try {
      let legendaId = legenda?.id;

      // Se não tem legenda, criar uma
      if (!legendaId) {
        const createResponse = await legendaApi.create({
          profileId: localProfile.id,
          legendaFoto: legenda?.legendaFoto || "",
          greeting: legenda?.greeting || "Olá, eu sou",
          nome: legenda?.nome || "Nome",
          titulo: legenda?.titulo || "Título",
          subtitulo: legenda?.subtitulo || "Subtitulo",
          descricao: legenda?.descricao || "Descrição",
        });
        legendaId = createResponse.legenda.id;

        // Atualizar o estado local com a nova legenda
        setLocalProfile((prev) => ({
          ...prev,
          legendas: [createResponse.legenda],
        }));
      }

      // Agora atualizar o campo específico
      await legendaApi.update(legendaId, { [field]: value });

      // Atualizar estado local
      setLocalProfile((prev) => {
        if (!prev.legendas || prev.legendas.length === 0) return prev;
        return {
          ...prev,
          legendas: [
            {
              ...prev.legendas[0],
              [field]: value,
            },
          ],
        };
      });

      toast.success("Campo atualizado com sucesso!");
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao atualizar legenda:", error);
      toast.error("Erro ao atualizar campo");
      throw error;
    }
  };

  const handleAvatarUpdate = async (url: string) => {
    if (!localProfile.id) {
      toast.error("Perfil não encontrado");
      return;
    }

    try {
      await profileApi.update(localProfile.id, { avatarUrl: url });

      setLocalProfile((prev) => ({
        ...prev,
        avatarUrl: url,
      }));

      toast.success("Avatar atualizado com sucesso!");
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error);
      toast.error("Erro ao atualizar avatar");
      throw error;
    }
  };

  const handleResumeUpdate = async (url: string) => {
    if (!localProfile.footer?.id) {
      toast.error("Footer não encontrado");
      return;
    }

    try {
      await footerApi.update(localProfile.footer.id, { resumeUrl: url });

      setLocalProfile((prev) => ({
        ...prev,
        footer: prev.footer
          ? {
              ...prev.footer,
              resumeUrl: url,
            }
          : undefined,
      }));

      toast.success("Currículo atualizado com sucesso!");
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao atualizar currículo:", error);
      toast.error("Erro ao atualizar currículo");
      throw error;
    }
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
    setLocalProfile((prev) => ({
      ...prev,
      techStack: updatedTechStack as any,
    }));

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
      onProfileUpdate?.();
    } catch (e) {
      toast.error("Error adding tech");
    }
  };

  const handleRemoveTech = async (techToRemove: Technology) => {
    const currentTechs = currentProfile.techStack?.technologies || [];
    const newTechnologies = currentTechs.filter((t) =>
      t.id ? t.id !== techToRemove.id : t.name !== techToRemove.name,
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
    setLocalProfile((prev) => ({
      ...prev,
      techStack: updatedTechStack as any,
    }));

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
        onProfileUpdate?.();
      }
    } catch (e) {
      toast.error("Error removing tech");
    }
  };

  const openWorkModal = (work?: WorkExperience) => {
    if (work) {
      setEditingWork(work);
      setWorkForm({
        company: work.company || "",
        period: work.period || "",
        summary: work.summary || "",
        impact: work.impact || "",
        technologies: work.technologies
          .map((tech) => tech.technology)
          .join(", "),
        responsibilities: work.responsibilities
          .map((resp) => resp.responsibility)
          .join(", "),
      });
    } else {
      setEditingWork(null);
      setWorkForm({
        company: "",
        period: "",
        summary: "",
        impact: "",
        technologies: "",
        responsibilities: "",
      });
    }
    setIsWorkModalOpen(true);
  };

  const handleWorkSave = async () => {
    if (!localProfile.id) return;

    try {
      const basePayload = {
        company: workForm.company.trim() || "Empresa",
        period: workForm.period.trim() || "2024",
        summary: workForm.summary.trim() || "Resumo da experiencia",
        impact: workForm.impact.trim(),
        ordem: editingWork?.ordem || workHistory.length + 1,
        technologies: workForm.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean)
          .map((technology) => ({ technology })),
        responsibilities: workForm.responsibilities
          .split(",")
          .map((resp) => resp.trim())
          .filter(Boolean)
          .map((responsibility, index) => ({
            responsibility,
            ordem: index + 1,
          })),
      };

      let updatedWork: WorkExperience;
      if (editingWork?.id) {
        updatedWork = await workExperienceApi.update(
          editingWork.id,
          basePayload,
        );
        setLocalProfile((prev) => ({
          ...prev,
          workHistory: prev.workHistory?.map((item) =>
            item.id === editingWork.id ? updatedWork : item,
          ),
        }));
      } else {
        updatedWork = await workExperienceApi.create({
          profileId: localProfile.id,
          ...basePayload,
        });
        setLocalProfile((prev) => ({
          ...prev,
          workHistory: [...(prev.workHistory || []), updatedWork],
        }));
      }

      toast.success("Experiencia atualizada!");
      setIsWorkModalOpen(false);
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao atualizar experiencia:", error);
      toast.error("Erro ao atualizar experiencia");
    }
  };

  const handleWorkDelete = async () => {
    if (!editingWork?.id) return;
    try {
      await workExperienceApi.delete(editingWork.id);
      setLocalProfile((prev) => ({
        ...prev,
        workHistory: prev.workHistory?.filter(
          (item) => item.id !== editingWork.id,
        ),
      }));
      toast.success("Experiencia removida!");
      setIsWorkModalOpen(false);
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao remover experiencia:", error);
      toast.error("Erro ao remover experiencia");
    }
  };

  const openProjectModal = (project?: Projeto) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        nome: project.nome || "",
        descricao: project.descricao || "",
        demoLink: project.demoLink || "",
        codeLink: project.codeLink || "",
        gif: project.gif || "",
        tags: project.tags?.join(", ") || "",
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        nome: "",
        descricao: "",
        demoLink: "",
        codeLink: "",
        gif: "",
        tags: "",
      });
    }
    setIsProjectModalOpen(true);
  };

  const handleProjectSave = async () => {
    console.log("handleProjectSave - Iniciando salvamento");
    if (!localProfile.id) {
      console.error("Profile ID não encontrado:", localProfile);
      toast.error("Perfil não encontrado");
      return;
    }

    try {
      console.log("handleProjectSave - Preparando payload");
      const basePayload: any = {
        nome: projectForm.nome.trim() || "Projeto",
        descricao: projectForm.descricao.trim() || "Descricao do projeto",
        ordem: editingProject?.ordem ?? projects.length + 1,
      };

      // Adicionar campos opcionais apenas se tiverem valor
      if (projectForm.demoLink.trim()) {
        basePayload.demoLink = projectForm.demoLink.trim();
      }
      if (projectForm.codeLink.trim()) {
        basePayload.codeLink = projectForm.codeLink.trim();
      }
      // Remover validação de URL para gif - usar uma URL válida ou deixar vazio
      if (
        projectForm.gif.trim() &&
        projectForm.gif.trim() !== "https://picsum.photos/seed/project/800/450"
      ) {
        basePayload.gif = projectForm.gif.trim();
      }
      // Não enviar gif se for a URL padrão que pode falhar na validação

      const tags = projectForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      if (tags.length > 0) {
        basePayload.tags = tags;
      }

      console.log("Payload do projeto:", basePayload);
      console.log("Profile ID:", localProfile.id);
      console.log("Profile ID type:", typeof localProfile.id);
      console.log("Profile ID length:", localProfile.id?.length);

      // Validar se o profileId é um UUID válido
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(localProfile.id)) {
        console.error("Profile ID não é um UUID válido:", localProfile.id);
        toast.error("ID do perfil inválido");
        return;
      }

      console.log("handleProjectSave - Chamando API");
      if (editingProject?.id) {
        const response = await projetosApi.update(
          editingProject.id,
          basePayload,
        );
        console.log("handleProjectSave - Update response:", response);
        setLocalProfile((prev) => ({
          ...prev,
          projetos: prev.projetos?.map((item) =>
            item.id === editingProject.id ? response.projeto : item,
          ),
        }));
      } else {
        // Garantir que profileId seja string
        const createPayload = {
          profileId: String(localProfile.id),
          nome: basePayload.nome,
          descricao: basePayload.descricao,
          ordem: basePayload.ordem,
          ...(basePayload.demoLink && { demoLink: basePayload.demoLink }),
          ...(basePayload.codeLink && { codeLink: basePayload.codeLink }),
          ...(basePayload.gif && { gif: basePayload.gif }),
          ...(basePayload.tags && { tags: basePayload.tags }),
        };

        console.log("Create payload final:", createPayload);

        const response = await projetosApi.create(createPayload);
        console.log("Resposta da criação do projeto:", response);

        // A API pode retornar o projeto diretamente ou encapsulado em { projeto: ... }
        const novoProjeto = response?.projeto || response;
        
        if (novoProjeto && novoProjeto.id) {
          setLocalProfile((prev) => ({
            ...prev,
            projetos: [...(prev.projetos || []), novoProjeto],
          }));
        } else {
          console.error("Resposta inválida da API:", response);
          toast.error("Resposta inválida do servidor");
          return;
        }
      }

      console.log("handleProjectSave - Salvamento concluído");
      toast.success("Projeto atualizado!");
      setIsProjectModalOpen(false);
      onProfileUpdate?.();
    } catch (error: any) {
      console.error("Erro ao atualizar projeto:", error);
      console.error("Detalhes do erro:", error.response?.data);
      toast.error(
        "Erro ao atualizar projeto: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  const handleProjectDelete = async () => {
    if (!editingProject?.id) return;
    try {
      await projetosApi.delete(editingProject.id);
      setLocalProfile((prev) => ({
        ...prev,
        projetos: prev.projetos?.filter(
          (item) => item.id !== editingProject.id,
        ),
      }));
      toast.success("Projeto removido!");
      setIsProjectModalOpen(false);
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao remover projeto:", error);
      toast.error("Erro ao remover projeto");
    }
  };

  const openFooterModal = () => {
    setFooterForm({
      title: localProfile.footer?.title || "Vamos trabalhar juntos?",
      subtitle:
        localProfile.footer?.subtitle ||
        "Estou sempre aberto a novos projetos e oportunidades",
      email: localProfile.footer?.email || "",
      github: localProfile.footer?.github || "",
      linkedin: localProfile.footer?.linkedin || "",
      twitter: localProfile.footer?.twitter || "",
      resumeUrl: localProfile.footer?.resumeUrl || "",
      copyrightName: localProfile.footer?.copyrightName || "Bio4Dev",
      madeWith: localProfile.footer?.madeWith || "Feito com cafe e codigo",
    });
    setIsFooterModalOpen(true);
  };

  const handleFooterSave = async () => {
    if (!localProfile.id) return;

    try {
      const basePayload = {
        title: footerForm.title.trim() || "Vamos trabalhar juntos?",
        subtitle:
          footerForm.subtitle.trim() ||
          "Estou sempre aberto a novos projetos e oportunidades",
        email: footerForm.email.trim() || undefined,
        github: footerForm.github.trim() || undefined,
        linkedin: footerForm.linkedin.trim() || undefined,
        twitter: footerForm.twitter.trim() || undefined,
        resumeUrl: footerForm.resumeUrl.trim() || undefined,
        copyrightName: footerForm.copyrightName.trim() || "Bio4Dev",
        madeWith: footerForm.madeWith.trim() || "Feito com cafe e codigo",
      };

      if (localProfile.footer?.id) {
        await footerApi.update(localProfile.footer.id, basePayload);
      } else {
        await footerApi.create({
          profileId: localProfile.id,
          ...basePayload,
        });
      }

      setLocalProfile((prev) => ({
        ...prev,
        footer: {
          ...(prev.footer || { id: prev.footer?.id || "" }),
          title: basePayload.title,
          subtitle: basePayload.subtitle,
          email: basePayload.email,
          github: basePayload.github,
          linkedin: basePayload.linkedin,
          twitter: basePayload.twitter,
          resumeUrl: basePayload.resumeUrl,
          copyrightName: basePayload.copyrightName,
          madeWith: basePayload.madeWith,
        },
      }));

      toast.success("Footer atualizado!");
      setIsFooterModalOpen(false);
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao atualizar footer:", error);
      toast.error("Erro ao atualizar footer");
    }
  };

  const handleFooterDelete = async () => {
    if (!localProfile.footer?.id) return;
    try {
      await footerApi.delete(localProfile.footer.id);
      setLocalProfile((prev) => ({ ...prev, footer: undefined }));
      toast.success("Footer removido!");
      setIsFooterModalOpen(false);
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao remover footer:", error);
      toast.error("Erro ao remover footer");
    }
  };

  const mappedTechStack: Technology[] =
    currentProfile.techStack?.technologies?.map((tech, idx) => ({
      ...tech,
      id: tech.id || `tech-${idx}`,
      techStackId: currentProfile.techStack?.id || "",
      color: tech.color || "text-gray-700",
      ordem: tech.ordem ?? idx,
    })) || [];
  const techStackData =
    mappedTechStack.length > 0 ? mappedTechStack : DEMO_TECH_STACK;

  try {
    // Verificação adicional de segurança
    if (!localProfile) {
      return (
        <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-yellow-600 mb-4">
              Carregando...
            </h2>
            <p className="text-yellow-500">Inicializando dados do perfil.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white">
        {/* Botão de Currículo Editável - Fixo no Topo */}
        <EditableResumeButton
          resumeUrl={localProfile.footer?.resumeUrl}
          onResumeUpdate={handleResumeUpdate}
        />

        {/* Seção Hero */}
        <EditableHero
          profile={localProfile}
          legenda={legenda}
          onLegendaUpdate={handleLegendaUpdate}
          onAvatarUpdate={handleAvatarUpdate}
        />

        {/* Seção Tech Stack */}
        <TechStack
          data={techStackData}
          onAdd={handleAddTech}
          onRemove={handleRemoveTech}
        />

        {/* Seção de Histórico de Trabalho */}
        <div className="relative">
          <button
            type="button"
            onClick={() => openWorkModal()}
            className="absolute right-6 top-6 z-10 inline-flex items-center gap-2 rounded-full bg-white shadow-md px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            <Plus className="h-4 w-4" />
            Nova Experiencia
          </button>
          <WorkHistory workHistory={localProfile.workHistory} />
          <div className="max-w-6xl mx-auto px-6 pb-10">
            {workHistory.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {workHistory.map((work) => (
                  <button
                    key={work.id}
                    type="button"
                    onClick={() => openWorkModal(work)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 hover:bg-slate-50"
                  >
                    <Pencil className="h-3 w-3" />
                    {work.company || "Experiencia"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Seção de Projetos */}
        <div className="relative">
          <button
            type="button"
            onClick={() => openProjectModal()}
            className="absolute right-6 top-6 z-10 inline-flex items-center gap-2 rounded-full bg-white shadow-md px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            <Plus className="h-4 w-4" />
            Novo Projeto
          </button>
          <Projects projects={localProfile.projetos} />
          <div className="max-w-7xl mx-auto px-6 pb-10">
            {projects.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => openProjectModal(project)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 hover:bg-slate-50"
                  >
                    <Pencil className="h-3 w-3" />
                    {project.nome || "Projeto"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Rodapé */}
        <div className="relative">
          <button
            type="button"
            onClick={openFooterModal}
            className="absolute right-6 top-6 z-10 inline-flex items-center gap-2 rounded-full bg-white shadow-md px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            <Pencil className="h-4 w-4" />
            Editar Footer
          </button>
          <Footer footer={localProfile.footer} socials={localProfile.social} />
        </div>
        {/* Work Experience Modal */}
        <Dialog open={isWorkModalOpen} onOpenChange={setIsWorkModalOpen}>
          <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingWork ? "Editar Experiencia" : "Nova Experiencia"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <Label>Empresa</Label>
                <Input
                  value={workForm.company}
                  onChange={(event) =>
                    setWorkForm((prev) => ({
                      ...prev,
                      company: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Periodo</Label>
                <Input
                  value={workForm.period}
                  onChange={(event) =>
                    setWorkForm((prev) => ({
                      ...prev,
                      period: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Resumo</Label>
                <Textarea
                  value={workForm.summary}
                  onChange={(event) =>
                    setWorkForm((prev) => ({
                      ...prev,
                      summary: event.target.value,
                    }))
                  }
                  rows={3}
                />
              </div>
              <div className="space-y-1">
                <Label>Impacto</Label>
                <Textarea
                  value={workForm.impact}
                  onChange={(event) =>
                    setWorkForm((prev) => ({
                      ...prev,
                      impact: event.target.value,
                    }))
                  }
                  rows={2}
                />
              </div>
              <div className="space-y-1">
                <Label>Tecnologias (separadas por virgula)</Label>
                <Input
                  value={workForm.technologies}
                  onChange={(event) =>
                    setWorkForm((prev) => ({
                      ...prev,
                      technologies: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Responsabilidades (separadas por virgula)</Label>
                <Textarea
                  value={workForm.responsibilities}
                  onChange={(event) =>
                    setWorkForm((prev) => ({
                      ...prev,
                      responsibilities: event.target.value,
                    }))
                  }
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
              {editingWork ? (
                <Button
                  variant="destructive"
                  type="button"
                  onClick={handleWorkDelete}
                >
                  Remover
                </Button>
              ) : (
                <div />
              )}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsWorkModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="button" onClick={handleWorkSave}>
                  Salvar
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Projects Modal */}
        <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
          <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Editar Projeto" : "Novo Projeto"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <Label>Nome</Label>
                <Input
                  value={projectForm.nome}
                  onChange={(event) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      nome: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Descricao</Label>
                <Textarea
                  value={projectForm.descricao}
                  onChange={(event) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      descricao: event.target.value,
                    }))
                  }
                  rows={3}
                />
              </div>
              <div className="space-y-1">
                <Label>Demo URL</Label>
                <Input
                  value={projectForm.demoLink}
                  onChange={(event) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      demoLink: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Codigo URL</Label>
                <Input
                  value={projectForm.codeLink}
                  onChange={(event) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      codeLink: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Imagem/Gif URL</Label>
                <Input
                  value={projectForm.gif}
                  onChange={(event) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      gif: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Tags (separadas por virgula)</Label>
                <Input
                  value={projectForm.tags}
                  onChange={(event) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      tags: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
              {editingProject ? (
                <Button
                  variant="destructive"
                  type="button"
                  onClick={handleProjectDelete}
                >
                  Remover
                </Button>
              ) : (
                <div />
              )}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="button" onClick={handleProjectSave}>
                  Salvar
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Footer Modal */}
        <Dialog open={isFooterModalOpen} onOpenChange={setIsFooterModalOpen}>
          <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Footer</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <Label>Titulo</Label>
                <Input
                  value={footerForm.title}
                  onChange={(event) =>
                    setFooterForm((prev) => ({
                      ...prev,
                      title: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Subtitulo</Label>
                <Textarea
                  value={footerForm.subtitle}
                  onChange={(event) =>
                    setFooterForm((prev) => ({
                      ...prev,
                      subtitle: event.target.value,
                    }))
                  }
                  rows={2}
                />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  value={footerForm.email}
                  onChange={(event) =>
                    setFooterForm((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>GitHub</Label>
                <Input
                  value={footerForm.github}
                  onChange={(event) =>
                    setFooterForm((prev) => ({
                      ...prev,
                      github: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>LinkedIn</Label>
                <Input
                  value={footerForm.linkedin}
                  onChange={(event) =>
                    setFooterForm((prev) => ({
                      ...prev,
                      linkedin: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Twitter</Label>
                <Input
                  value={footerForm.twitter}
                  onChange={(event) =>
                    setFooterForm((prev) => ({
                      ...prev,
                      twitter: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Resume URL</Label>
                <Input
                  value={footerForm.resumeUrl}
                  onChange={(event) =>
                    setFooterForm((prev) => ({
                      ...prev,
                      resumeUrl: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Copyright</Label>
                <Input
                  value={footerForm.copyrightName}
                  onChange={(event) =>
                    setFooterForm((prev) => ({
                      ...prev,
                      copyrightName: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Made With</Label>
                <Input
                  value={footerForm.madeWith}
                  onChange={(event) =>
                    setFooterForm((prev) => ({
                      ...prev,
                      madeWith: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <Button
                variant="destructive"
                type="button"
                onClick={handleFooterDelete}
                disabled={!localProfile.footer?.id}
              >
                Remover Footer
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsFooterModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="button" onClick={handleFooterSave}>
                  Salvar
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  } catch (error) {
    console.error("Erro no render do EditablePortfolio1:", error);
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Erro no Componente
          </h2>
          <p className="text-red-500 mb-4">
            Ocorreu um erro ao renderizar o portfólio editável.
          </p>
          <details className="text-left bg-white p-4 rounded border">
            <summary className="cursor-pointer font-medium">
              Detalhes do erro
            </summary>
            <pre className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
              {error instanceof Error ? error.message : String(error)}
            </pre>
          </details>
        </div>
      </div>
    );
  }
}
