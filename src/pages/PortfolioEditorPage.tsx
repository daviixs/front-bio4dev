import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, ExternalLink, Github, Linkedin, Twitter, Mail, Coffee, Code2, FileCode, Palette, Database, GitBranch, Terminal, Settings, Briefcase, Calendar, MapPin, User, Facebook, Figma, FolderGit2, Cpu, ArrowUpRight, Pencil, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { EditableWrapper } from '@/components/portfolio/EditableWrapper';
import { ThemeCustomizer } from '@/components/portfolio/ThemeCustomizer';
import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

// Lista de tecnologias populares para o seletor
const POPULAR_TECHS = [
  // 🌐 Frontend
  { name: 'HTML5', icon: 'logos:html-5' },
  { name: 'CSS3', icon: 'logos:css-3' },
  { name: 'JavaScript', icon: 'logos:javascript' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'React', icon: 'logos:react' },
  { name: 'Next.js', icon: 'logos:nextjs-icon' },
  { name: 'Vue.js', icon: 'logos:vue' },
  { name: 'Nuxt.js', icon: 'logos:nuxt-icon' },
  { name: 'Angular', icon: 'logos:angular-icon' },
  { name: 'Svelte', icon: 'logos:svelte-icon' },
  { name: 'SvelteKit', icon: 'logos:svelte-icon' },
  { name: 'SolidJS', icon: 'logos:solidjs-icon' },
  { name: 'Astro', icon: 'logos:astro-icon' },
  { name: 'Qwik', icon: 'logos:qwik-icon' },
  { name: 'Vite', icon: 'logos:vitejs' },
  { name: 'Webpack', icon: 'logos:webpack' },
  { name: 'Parcel', icon: 'logos:parcel-icon' },
  { name: 'Rollup', icon: 'logos:rollup' },
  { name: 'Babel', icon: 'logos:babel' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
  { name: 'Bootstrap', icon: 'logos:bootstrap' },
  { name: 'Material UI (MUI)', icon: 'logos:material-ui' },
  { name: 'Ant Design', icon: 'logos:ant-design' },
  { name: 'Chakra UI', icon: 'simple-icons:chakraui' },
  { name: 'Shadcn UI', icon: 'simple-icons:shadcnui' },
  { name: 'Radix UI', icon: 'simple-icons:radixui' },
  { name: 'Styled Components', icon: 'skill-icons:styledcomponents' },
  { name: 'Emotion', icon: 'simple-icons:emotion' },
  { name: 'Sass (SCSS)', icon: 'logos:sass' },
  { name: 'Less', icon: 'logos:less' },
  { name: 'PostCSS', icon: 'logos:postcss' },
  { name: 'Redux', icon: 'logos:redux' },
  { name: 'Redux Toolkit', icon: 'logos:redux' },
  { name: 'Zustand', icon: 'simple-icons:zustand' }, // No dedicated logo in standard sets sometimes, using text/simple
  { name: 'Recoil', icon: 'simple-icons:recoil' },
  { name: 'Jotai', icon: 'simple-icons:jotai' },
  { name: 'MobX', icon: 'logos:mobx' },
  { name: 'React Query (TanStack Query)', icon: 'logos:react-query-icon' },
  { name: 'SWR', icon: 'logos:swr' },
  { name: 'Apollo Client', icon: 'logos:apollostack' },
  { name: 'GraphQL', icon: 'logos:graphql' },
  { name: 'Framer Motion', icon: 'logos:framer' },
  { name: 'GSAP', icon: 'logos:greensock-icon' },
  { name: 'Three.js', icon: 'logos:threejs' },
  { name: 'React Three Fiber', icon: 'simple-icons:threedotjs' },
  { name: 'D3.js', icon: 'logos:d3' },
  { name: 'Chart.js', icon: 'simple-icons:chartdotjs' },
  { name: 'ECharts', icon: 'simple-icons:apacheecharts' },
  { name: 'Storybook', icon: 'logos:storybook-icon' },
  { name: 'Cypress', icon: 'logos:cypress-icon' },
  { name: 'Playwright', icon: 'logos:playwright' },
  { name: 'Jest', icon: 'logos:jest' },
  { name: 'Vitest', icon: 'logos:vitest' },
  { name: 'Testing Library', icon: 'simple-icons:testinglibrary' },
  { name: 'ESLint', icon: 'logos:eslint' },
  { name: 'Prettier', icon: 'logos:prettier' },
  { name: 'Husky', icon: 'simple-icons:husky' },
  { name: 'Lint-staged', icon: 'simple-icons:lintstaged' },
  { name: 'PWA', icon: 'logos:pwa' },
  { name: 'Web Components', icon: 'simple-icons:webcomponentsdotorg' },

  // 🧠 Backend
  { name: 'Node.js', icon: 'logos:nodejs-icon' },
  { name: 'Express', icon: 'skill-icons:expressjs-light' },
  { name: 'Fastify', icon: 'logos:fastify-icon' },
  { name: 'NestJS', icon: 'logos:nestjs' },
  { name: 'AdonisJS', icon: 'logos:adonisjs-icon' },
  { name: 'Hapi', icon: 'simple-icons:hapi' },
  { name: 'Koa', icon: 'logos:koa' },
  { name: 'Bun', icon: 'logos:bun' },
  { name: 'Deno', icon: 'logos:deno' },
  { name: 'Java', icon: 'logos:java' },
  { name: 'Spring Boot', icon: 'logos:spring-icon' },
  { name: 'Spring Cloud', icon: 'logos:spring-icon' },
  { name: 'Quarkus', icon: 'logos:quarkus-icon' },
  { name: 'Micronaut', icon: 'logos:micronaut-icon' },
  { name: 'Kotlin', icon: 'logos:kotlin-icon' },
  { name: 'Ktor', icon: 'simple-icons:ktor' },
  { name: 'C#', icon: 'logos:c-sharp' },
  { name: '.NET', icon: 'logos:dotnet' },
  { name: 'ASP.NET Core', icon: 'logos:dotnet' },
  { name: 'Python', icon: 'logos:python' },
  { name: 'Django', icon: 'logos:django-icon' },
  { name: 'Django Rest Framework', icon: 'logos:django-icon' },
  { name: 'Flask', icon: 'logos:flask' },
  { name: 'FastAPI', icon: 'logos:fastapi-icon' },
  { name: 'Pyramid', icon: 'simple-icons:pylon' }, // approximations
  { name: 'Ruby', icon: 'logos:ruby' },
  { name: 'Ruby on Rails', icon: 'logos:rails' },
  { name: 'Sinatra', icon: 'logos:sinatra' },
  { name: 'PHP', icon: 'logos:php' },
  { name: 'Laravel', icon: 'logos:laravel' },
  { name: 'Symfony', icon: 'logos:symfony' },
  { name: 'CodeIgniter', icon: 'logos:codeigniter-icon' },
  { name: 'CakePHP', icon: 'logos:cakephp-icon' },
  { name: 'Go', icon: 'logos:go' },
  { name: 'Gin', icon: 'logos:go' }, // Go frameworks usually use Go logo or specific ones
  { name: 'Fiber', icon: 'logos:go' },
  { name: 'Echo', icon: 'logos:go' },
  { name: 'Rust', icon: 'logos:rust' },
  { name: 'Actix', icon: 'simple-icons:actix' },
  { name: 'Axum', icon: 'simple-icons:axum' },
  { name: 'Rocket', icon: 'logos:rust' },
  { name: 'Elixir', icon: 'logos:elixir' },
  { name: 'Phoenix', icon: 'logos:phoenix' },
  { name: 'Erlang', icon: 'logos:erlang' },
  { name: 'Scala', icon: 'logos:scala' },
  { name: 'Play Framework', icon: 'logos:play' },
  { name: 'Groovy', icon: 'logos:groovy' },
  { name: 'Grails', icon: 'logos:grails' },
  { name: 'C', icon: 'logos:c' },
  { name: 'C++', icon: 'logos:c-plusplus' },
  { name: 'Zig', icon: 'logos:zig' },
  { name: 'Lua', icon: 'logos:lua' },
  { name: 'Swift', icon: 'logos:swift' },
  { name: 'Vapor', icon: 'logos:swift' },
  { name: 'Objective-C', icon: 'logos:objectivec' },
  { name: 'Perl', icon: 'logos:perl' },
  { name: 'Haskell', icon: 'logos:haskell-icon' },
  { name: 'OCaml', icon: 'logos:ocaml' },
  { name: 'Crystal', icon: 'logos:crystal' },
  { name: 'Nim', icon: 'logos:nim-lang' },
  { name: 'GraphQL Yoga', icon: 'logos:graphql' },
  { name: 'Apollo Server', icon: 'logos:apollostack' },
  { name: 'tRPC', icon: 'logos:trpc' },
  { name: 'REST', icon: 'simple-icons:openapiinitiative' },
  { name: 'gRPC', icon: 'logos:grpc' },
  { name: 'SOAP', icon: 'simple-icons:soap' },
  { name: 'OpenAPI', icon: 'logos:openapi-icon' },
  { name: 'Swagger', icon: 'logos:swagger' },
  { name: 'Postman', icon: 'logos:postman-icon' },
  { name: 'Insomnia', icon: 'logos:insomnia' },

  // 🗄️ Bancos de Dados
  { name: 'PostgreSQL', icon: 'logos:postgresql' },
  { name: 'MySQL', icon: 'logos:mysql' },
  { name: 'MariaDB', icon: 'logos:mariadb-icon' },
  { name: 'SQLite', icon: 'logos:sqlite' },
  { name: 'Oracle DB', icon: 'logos:oracle' },
  { name: 'SQL Server', icon: 'logos:microsoft-sql-server' },
  { name: 'MongoDB', icon: 'logos:mongodb-icon' },
  { name: 'Redis', icon: 'logos:redis' },
  { name: 'DynamoDB', icon: 'logos:aws-dynamodb' },
  { name: 'Cassandra', icon: 'logos:cassandra' },
  { name: 'CouchDB', icon: 'logos:couchdb' },
  { name: 'Couchbase', icon: 'logos:couchbase' },
  { name: 'Firebase Firestore', icon: 'logos:firebase' },
  { name: 'Firebase Realtime DB', icon: 'logos:firebase' },
  { name: 'Supabase', icon: 'logos:supabase-icon' },
  { name: 'Neon', icon: 'logos:neon-icon' },
  { name: 'PlanetScale', icon: 'logos:planetscale' },
  { name: 'CockroachDB', icon: 'logos:cockroachdb' },
  { name: 'TimescaleDB', icon: 'logos:timescale' },
  { name: 'InfluxDB', icon: 'logos:influxdb' },
  { name: 'ClickHouse', icon: 'logos:clickhouse' },
  { name: 'BigQuery', icon: 'logos:google-bigquery' },
  { name: 'Snowflake', icon: 'logos:snowflake-icon' },
  { name: 'Elasticsearch', icon: 'logos:elasticsearch' },
  { name: 'OpenSearch', icon: 'logos:opensearch' },
  { name: 'Meilisearch', icon: 'logos:meilisearch' },
  { name: 'Algolia', icon: 'logos:algolia' },
  { name: 'Solr', icon: 'logos:solr' },
  { name: 'Neo4j', icon: 'logos:neo4j' },
  { name: 'ArangoDB', icon: 'logos:arangodb' },
  { name: 'FaunaDB', icon: 'logos:fauna' },
  { name: 'Realm', icon: 'logos:realm' },
  { name: 'Prisma', icon: 'logos:prisma' },
  { name: 'TypeORM', icon: 'logos:typeorm' },
  { name: 'Sequelize', icon: 'logos:sequelize' },
  { name: 'Drizzle ORM', icon: 'simple-icons:drizzle' },
  { name: 'MikroORM', icon: 'simple-icons:mikroorm' },
  { name: 'Hibernate', icon: 'logos:hibernate' },
  { name: 'JPA', icon: 'logos:java' },
  { name: 'Flyway', icon: 'simple-icons:flyway' },
  { name: 'Liquibase', icon: 'logos:liquibase' },
  { name: 'Supabase Storage', icon: 'logos:supabase-icon' },
  { name: 'MinIO', icon: 'logos:minio' },
  { name: 'Amazon S3', icon: 'logos:aws-s3' },
  { name: 'Google Cloud Storage', icon: 'logos:google-cloud' },
  { name: 'Azure Blob Storage', icon: 'logos:azure' },
  { name: 'Firebase Storage', icon: 'logos:firebase' },
  { name: 'Redis Streams', icon: 'logos:redis' },
  { name: 'Kafka Streams', icon: 'logos:kafka-icon' },
  { name: 'Mongo Atlas', icon: 'logos:mongodb-icon' },

  // ☁️ DevOps, Cloud & Infra
  { name: 'Docker', icon: 'logos:docker-icon' },
  { name: 'Docker Compose', icon: 'logos:docker-icon' },
  { name: 'Kubernetes', icon: 'logos:kubernetes' },
  { name: 'Helm', icon: 'logos:helm' },
  { name: 'Terraform', icon: 'logos:terraform-icon' },
  { name: 'Pulumi', icon: 'logos:pulumi-icon' },
  { name: 'Ansible', icon: 'logos:ansible' },
  { name: 'Vagrant', icon: 'logos:vagrant-icon' },
  { name: 'AWS', icon: 'logos:aws' },
  { name: 'AWS Lambda', icon: 'logos:aws-lambda' },
  { name: 'AWS ECS', icon: 'logos:aws-ecs' },
  { name: 'AWS EKS', icon: 'logos:aws-eks' },
  { name: 'AWS EC2', icon: 'logos:aws-ec2' },
  { name: 'AWS RDS', icon: 'logos:aws-rds' },
  { name: 'Google Cloud Platform', icon: 'logos:google-cloud' },
  { name: 'Cloud Run', icon: 'logos:google-cloud-run' },
  { name: 'Firebase', icon: 'logos:firebase' },
  { name: 'Azure', icon: 'logos:azure-icon' },
  { name: 'Azure Functions', icon: 'logos:azure-functions' },
  { name: 'DigitalOcean', icon: 'logos:digital-ocean-icon' },
  { name: 'Vercel', icon: 'logos:vercel-icon' },
  { name: 'Netlify', icon: 'logos:netlify-icon' },
  { name: 'Railway', icon: 'logos:railway' },
  { name: 'Render', icon: 'simple-icons:render' },
  { name: 'Fly.io', icon: 'logos:flyio-icon' },
  { name: 'Heroku', icon: 'logos:heroku-icon' },
  { name: 'Cloudflare', icon: 'logos:cloudflare-icon' },
  { name: 'Cloudflare Workers', icon: 'logos:cloudflare-workers-icon' },
  { name: 'Nginx', icon: 'logos:nginx' },
  { name: 'Apache', icon: 'logos:apache' },
  { name: 'Traefik', icon: 'logos:traefik-icon' },
  { name: 'HAProxy', icon: 'simple-icons:haproxy' },
  { name: 'PM2', icon: 'simple-icons:pm2' },
  { name: 'GitHub Actions', icon: 'logos:github-actions' },
  { name: 'GitLab CI', icon: 'logos:gitlab' },
  { name: 'Bitbucket Pipelines', icon: 'logos:bitbucket' },
  { name: 'Jenkins', icon: 'logos:jenkins' },
  { name: 'ArgoCD', icon: 'logos:argo-icon' },
  { name: 'FluxCD', icon: 'logos:flux-icon' },
  { name: 'Prometheus', icon: 'logos:prometheus' },
  { name: 'Grafana', icon: 'logos:grafana' },
  { name: 'Datadog', icon: 'logos:datadog' },
  { name: 'New Relic', icon: 'logos:new-relic-icon' },
  { name: 'Sentry', icon: 'logos:sentry-icon' },
  { name: 'Logstash', icon: 'logos:logstash' },
  { name: 'Kibana', icon: 'logos:kibana' },
  { name: 'Elastic Stack (ELK)', icon: 'logos:elasticsearch' },
  { name: 'OpenTelemetry', icon: 'logos:opentelemetry-icon' },
  { name: 'Jaeger', icon: 'logos:jaegertracing' },
  { name: 'Loki', icon: 'logos:grafana' }, // Part of Grafana stack
  { name: 'Consul', icon: 'logos:consul' },
  { name: 'Vault', icon: 'logos:vault-icon' },
  { name: 'Istio', icon: 'logos:istio' },
  { name: 'Linkerd', icon: 'logos:linkerd' },
  { name: 'Serverless Framework', icon: 'logos:serverless' },
  { name: 'SST', icon: 'logos:sst-icon' },
  { name: 'Nx', icon: 'logos:nx' },
  { name: 'Turborepo', icon: 'logos:turborepo-icon' },
  { name: 'Monorepo', icon: 'medium' }, // concept, no specific logo usually
  { name: 'Microservices', icon: 'carbon:microservices-1' },

  // 📱 Mobile, Desktop, Games & Outros
  { name: 'React Native', icon: 'logos:react' },
  { name: 'Expo', icon: 'logos:expo-icon' },
  { name: 'Flutter', icon: 'logos:flutter' },
  { name: 'Dart', icon: 'logos:dart' },
  { name: 'SwiftUI', icon: 'logos:swift' },
  { name: 'UIKit', icon: 'logos:apple' },
  { name: 'Kotlin Android', icon: 'logos:kotlin-icon' },
  { name: 'Jetpack Compose', icon: 'logos:android-icon' },
  { name: 'Ionic', icon: 'logos:ionic-icon' },
  { name: 'Capacitor', icon: 'logos:capacitorjs-icon' },
  { name: 'Cordova', icon: 'logos:cordova' },
  { name: 'Electron', icon: 'logos:electron' },
  { name: 'Tauri', icon: 'logos:tauri' },
  { name: 'Neutralino', icon: 'simple-icons:neutralinojs' },
  { name: 'Qt', icon: 'logos:qt' },
  { name: 'JavaFX', icon: 'logos:java' },
  { name: 'WPF', icon: 'logos:dotnet' },
  { name: 'MAUI', icon: 'logos:dotnet' },
  { name: 'Unity', icon: 'logos:unity' },
  { name: 'Unreal Engine', icon: 'logos:unreal-engine' },
  { name: 'Godot', icon: 'logos:godot-icon' },
  { name: 'Phaser', icon: 'logos:phaser' },
  { name: 'PlayCanvas', icon: 'logos:playcanvas' },
  { name: 'Blender', icon: 'logos:blender' },
  { name: 'OpenGL', icon: 'logos:opengl' },
  { name: 'Vulkan', icon: 'logos:vulkan' },
  { name: 'DirectX', icon: 'simple-icons:directx' },
  { name: 'WebGL', icon: 'logos:webgl' },
  { name: 'WebGPU', icon: 'logos:w3c' },
  { name: 'Arduino', icon: 'logos:arduino' },
  { name: 'Raspberry Pi', icon: 'logos:raspberry-pi' },
  { name: 'ESP32', icon: 'logos:espressif' },
  { name: 'ROS', icon: 'logos:ros' },
  { name: 'TensorFlow', icon: 'logos:tensorflow' },
  { name: 'PyTorch', icon: 'logos:pytorch-icon' },
  { name: 'Keras', icon: 'logos:keras' },
  { name: 'Scikit-learn', icon: 'logos:scikit-learn' },
  { name: 'Pandas', icon: 'logos:pandas-icon' },
  { name: 'NumPy', icon: 'logos:numpy' },
  { name: 'Jupyter', icon: 'logos:jupyter' },
  { name: 'OpenCV', icon: 'logos:opencv' },
  { name: 'LangChain', icon: 'simple-icons:langchain' },
  { name: 'OpenAI API', icon: 'logos:openai-icon' },
  { name: 'Hugging Face', icon: 'logos:hugging-face-icon' },
  { name: 'Stable Diffusion', icon: 'simple-icons:stabilityai' },
  { name: 'Kafka', icon: 'logos:kafka-icon' },
  { name: 'RabbitMQ', icon: 'logos:rabbitmq-icon' },
  { name: 'ActiveMQ', icon: 'simple-icons:apacheactivemq' },
  { name: 'BullMQ', icon: 'simple-icons:bullmq' },
  { name: 'Celery', icon: 'simple-icons:celery' },
  { name: 'Sidekiq', icon: 'simple-icons:sidekiq' },
  { name: 'Temporal', icon: 'logos:temporal-icon' },
  { name: 'Airflow', icon: 'logos:airflow-icon' },
  { name: 'Supabase Auth', icon: 'logos:supabase-icon' },
  { name: 'Auth0', icon: 'logos:auth0-icon' },
  { name: 'Keycloak', icon: 'logos:keycloak' },
  { name: 'Firebase Auth', icon: 'logos:firebase' },
  { name: 'OAuth 2.0', icon: 'logos:oauth' },
  { name: 'JWT', icon: 'logos:jwt-icon' },
  { name: 'WebSockets', icon: 'simple-icons:socketdotio' }, // approximation
];

// Componentes editáveis do Portfólio 1
interface Portfolio1Data {
  hero: {
    greeting: string;
    name: string;
    tagline: string;
    description: string;
    avatarUrl: string;
  };
  theme: 'LIGHT' | 'DARK';
  mainColor: string;
  techStack: {
    title: string;
    subtitle: string;
    technologies: Array<{ name: string; icon: string; color: string }>;
  };
  workHistory: Array<{
    company: string;
    period: string;
    summary: string;
    technologies: string[];
    responsibilities: string[];
    impact: string;
  }>;
  projects: Array<{
    id?: string;
    nome: string;
    descricao: string;
    gif: string;
  }>;
  footer: {
    title: string;
    subtitle: string;
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
    copyrightName: string;
    madeWith: string;
  };
}

// Componentes editáveis do Portfólio 2
interface Portfolio2Data {
  profile: {
    name: string;
    role: string;
    tagline: string;
    location: string;
    avatarUrl: string;
  };
  socialLinks: Array<{
    id: string;
    name: string;
    handle: string;
    url: string;
    colorClass: string;
    textColorClass?: string;
    colSpan: 1 | 2;
  }>;
  experience: Array<{
    id: string;
    role: string;
    company: string;
    date: string;
    description: string;
    current: boolean;
  }>;
  projects: Array<{
    id: string;
    nome: string;
    descricao: string;
    gif: string;
  }>;
  techStack: Array<{ name: string; icon: string }>;
}

function AddTechDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (tech: { name: string; icon: string; color: string }) => void;
}) {
  const [search, setSearch] = useState('');
  const [selectedTech, setSelectedTech] = useState<typeof POPULAR_TECHS[0] | null>(null);

  const filteredTechs = POPULAR_TECHS.filter((tech) =>
    tech.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (selectedTech) {
      onAdd({
        name: selectedTech.name,
        icon: selectedTech.icon,
        color: 'text-gray-700', // Default color, as logos are colored
      });
      onOpenChange(false);
      setSearch('');
      setSelectedTech(null);
    } else if (search.trim()) {
       // Allow adding custom tech even if not in list
       onAdd({
        name: search,
        icon: 'lucide:code-2', // Default icon
        color: 'text-gray-700'
       });
       onOpenChange(false);
       setSearch('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Tecnologia</DialogTitle>
          <DialogDescription>
            Pesquise por uma tecnologia ou selecione da lista.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <Input
            placeholder="Buscar tecnologia (ex: React, Python)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />

          <ScrollArea className="h-[300px] border rounded-md p-2">
            <div className="grid grid-cols-2 gap-2">
              {filteredTechs.map((tech) => (
                <div
                  key={tech.name}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedTech?.name === tech.name
                      ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500'
                      : 'hover:bg-slate-50 border-transparent hover:border-slate-200'
                  }`}
                  onClick={() => setSelectedTech(tech)}
                >
                  <Icon icon={tech.icon} className="w-6 h-6" />
                  <span className="text-sm font-medium text-slate-700">{tech.name}</span>
                </div>
              ))}
              {filteredTechs.length === 0 && (
                <div className="col-span-2 text-center py-8 text-slate-500 text-sm">
                  <p>Nenhuma tecnologia encontrada na lista.</p>
                  <p className="mt-1 text-xs">Clique em "Adicionar" para adicionar "{search}" mesmo assim.</p>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex justify-end gap-2">
             <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancelar</Button>
             <Button onClick={handleAdd} disabled={!search && !selectedTech}>
               Adicionar {selectedTech ? selectedTech.name : search ? `"${search}"` : ''}
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type PortfolioData = Portfolio1Data | Portfolio2Data;

export function PortfolioEditorPage() {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const navigate = useNavigate();

  // Estado inicial baseado no portfólio selecionado
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    // Carregar dados do portfólio selecionado
    if (portfolioId === '1') {
      setPortfolioData({
        hero: {
          greeting: 'Olá, eu sou',
          name: 'João Silva',
          tagline: 'Eu construo coisas para web',
          description:
            'Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis. Especializado em transformar ideias em aplicações web modernas e funcionais.',
          avatarUrl:
            'https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQ5MjIxNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        theme: 'LIGHT',
        mainColor: '#4052D6',
        techStack: {
          title: 'Tech Stack',
          subtitle: 'Tecnologias e ferramentas que utilizo no dia a dia',
          technologies: [
            { name: 'HTML5', icon: 'logos:html-5', color: 'text-orange-600' },
            { name: 'CSS3', icon: 'logos:css-3', color: 'text-blue-600' },
            { name: 'JavaScript', icon: 'logos:javascript', color: 'text-yellow-500' },
            { name: 'React', icon: 'logos:react', color: 'text-cyan-500' },
            { name: 'Node.js', icon: 'logos:nodejs-icon', color: 'text-green-600' },
            { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', color: 'text-teal-500' },
            { name: 'Git', icon: 'logos:git-icon', color: 'text-orange-700' },
            { name: 'GitHub', icon: 'logos:github-icon', color: 'text-gray-800' },
            { name: 'VS Code', icon: 'logos:visual-studio-code', color: 'text-blue-500' },
            { name: 'PostgreSQL', icon: 'logos:postgresql', color: 'text-purple-600' },
          ],
        },
        workHistory: [
          {
            company: 'Empresa de E-commerce XPTO',
            period: '2023 - Atual',
            summary:
              'Desenvolvimento de plataforma de e-commerce escalável para mais de 100 mil usuários ativos. Refatoração completa do frontend para melhorar performance e experiência do usuário.',
            technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
            responsibilities: [
              'Desenvolvimento de componentes reutilizáveis e escaláveis',
              'Implementação de testes unitários e integração contínua',
              'Otimização de performance e SEO',
            ],
            impact: 'Redução de 40% no tempo de carregamento e aumento de 25% na taxa de conversão.',
          },
          {
            company: 'StartUp FinTech ABC',
            period: '2022 - 2023',
            summary:
              'Criação de dashboard financeiro para gestão de investimentos e análise de carteiras. Integração com múltiplas APIs bancárias e de mercado financeiro.',
            technologies: ['React', 'Next.js', 'Tailwind CSS', 'GraphQL', 'MongoDB'],
            responsibilities: [
              'Arquitetura e desenvolvimento do frontend da aplicação',
              'Integração com APIs de terceiros e tratamento de dados financeiros',
              'Desenvolvimento de gráficos e visualizações de dados em tempo real',
            ],
            impact: 'Aplicação lançada com sucesso, atendendo mais de 5 mil usuários nos primeiros 3 meses.',
          },
          {
            company: 'Agência Digital Criativa',
            period: '2021 - 2022',
            summary:
              'Desenvolvimento de sites institucionais e landing pages para diversos clientes. Foco em responsividade, acessibilidade e otimização de performance.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'WordPress', 'Sass', 'Git'],
            responsibilities: [
              'Transformação de designs (Figma/Adobe XD) em código responsivo',
              'Implementação de animações e interações complexas',
              'Garantia de compatibilidade cross-browser e acessibilidade',
            ],
            impact: 'Entrega de mais de 15 projetos dentro do prazo e orçamento, com taxa de satisfação de clientes acima de 95%.',
          },
        ],
        projects: [
          {
            nome: 'E-commerce Moderno',
            descricao:
              'Plataforma completa de e-commerce com carrinho, pagamentos e painel administrativo.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHY5b3BkcHVucXVtOWt6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif',
          },
          {
            nome: 'Dashboard Analytics',
            descricao:
              'Dashboard interativo para visualização de dados com gráficos e métricas em tempo real.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPEqDGUULpEU0aQ/giphy.gif',
          },
          {
            nome: 'App de Tarefas',
            descricao:
              'Aplicativo de gerenciamento de tarefas com drag & drop e categorização inteligente.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlBO7eyXzSZkJri/giphy.gif',
          },
          {
            nome: 'Rede Social',
            descricao:
              'Plataforma social com feed, stories, mensagens diretas e sistema de notificações.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKP9ln2Dr6ze6f6/giphy.gif',
          },
          {
            nome: 'Clone Netflix',
            descricao:
              'Réplica da interface da Netflix com integração de API de filmes e player de vídeo.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xeJpnrWC4XWblEk/giphy.gif',
          },
          {
            nome: 'Portfolio 3D',
            descricao:
              'Portfólio interativo com elementos 3D, animações e experiência imersiva.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRzozg4TCBXv6QU/giphy.gif',
          },
        ],
        footer: {
          title: 'Vamos trabalhar juntos?',
          subtitle: 'Estou sempre aberto a novos projetos e oportunidades',
          email: 'contato@joaosilva.dev',
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          copyrightName: 'João Silva',
          madeWith: 'Feito com 💙 e café',
        },
      });
    } else if (portfolioId === '2') {
      setPortfolioData({
        profile: {
          name: 'Muhammad Aqsam',
          role: 'Product Designer & Developer',
          tagline: 'Building digital products that matter.',
          location: 'Bahawalpur, Pakistan',
          avatarUrl:
            'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=fbbf24&clothing=hoodie&clothingColor=3c4f5c',
        },
        socialLinks: [
          { 
            id: 'github', 
            name: 'GitHub', 
            handle: '@m-aqsam', 
            url: 'https://github.com',
            colorClass: 'bg-[#18181b] hover:bg-[#27272a] border border-gray-800',
            colSpan: 2
          },
          { 
            id: 'email', 
            name: 'Email', 
            handle: 'maqsam1155@gmail.com', 
            url: 'mailto:maqsam1155@gmail.com',
            colorClass: 'bg-[#1e293b] hover:bg-[#263345]',
            colSpan: 1
          },
          { 
            id: 'facebook', 
            name: 'Facebook', 
            handle: '@m_aqsam', 
            url: 'https://facebook.com',
            colorClass: 'bg-[#3b82f6] hover:bg-[#2563eb]',
            colSpan: 1
          },
          { 
            id: 'figma', 
            name: 'Figma', 
            handle: '@maqsam', 
            url: 'https://figma.com',
            colorClass: 'bg-[#1e1e1e] hover:bg-[#2d2d2d]',
            colSpan: 1
          },
          { 
            id: 'dev', 
            name: 'DEV', 
            handle: '@maqsam', 
            url: 'https://dev.to',
            colorClass: 'bg-white hover:bg-gray-100',
            textColorClass: 'text-black',
            colSpan: 1
          },
        ],
        experience: [
          {
            id: '1',
            role: 'Senior Product Designer',
            company: 'TechFlow Solutions',
            date: '2023 - Present',
            description:
              'Leading the design system initiative and overseeing product UX for enterprise clients.',
            current: true,
          },
          {
            id: '2',
            role: 'Frontend Developer',
            company: 'Creative Digital',
            date: '2021 - 2023',
            description:
              'Developed responsive web applications using React and TypeScript. Collaborated closely with UI designers.',
            current: false,
          },
          {
            id: '3',
            role: 'UI/UX Intern',
            company: 'StartUp Inc',
            date: '2020 - 2021',
            description:
              'Assisted in wireframing and prototyping mobile applications. Conducted user research interviews.',
            current: false,
          },
        ],
        projects: [
          {
            id: 'p1',
            nome: 'E-Commerce Dashboard',
            descricao:
              'A comprehensive analytics dashboard for online retailers featuring real-time data visualization.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHY5b3BkcHVucXVtOWt6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif',
          },
          {
            id: 'p2',
            nome: 'HealthTrack App',
            descricao:
              'Mobile-first fitness tracking application focusing on simplicity and user retention.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPEqDGUULpEU0aQ/giphy.gif',
          },
          {
            id: 'p3',
            nome: 'Finance AI',
            descricao: 'Personal finance assistant powered by generative AI to help users save money.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKP9ln2Dr6ze6f6/giphy.gif',
          },
        ],
        techStack: [
             { name: 'React', icon: 'logos:react' },
             { name: 'TypeScript', icon: 'logos:typescript-icon' },
             { name: 'Next.js', icon: 'logos:nextjs-icon' },
             { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
             { name: 'Figma', icon: 'logos:figma' },
             { name: 'Node.js', icon: 'logos:nodejs-icon' }
          ],
      });
    }
  }, [portfolioId]);

  const handleSave = () => {
    // Aqui você pode salvar os dados no backend
    toast.success('Portfólio salvo com sucesso!');
  };

  if (!portfolioData || !portfolioId) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Carregando portfólio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0f0f17] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard/bio')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">
                  Editando Portfólio {portfolioId}
                </h1>
                <p className="text-sm text-white/60">
                  Clique no ícone de caneta para editar elementos
                </p>
              </div>
            </div>
            <Button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className={portfolioId === '1' ? 'bg-white' : ''}>
        {portfolioId === '1' && 'hero' in portfolioData && (
          <Portfolio1Editor data={portfolioData as Portfolio1Data} />
        )}
        {portfolioId === '2' && 'profile' in portfolioData && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Portfolio2Editor data={portfolioData as Portfolio2Data} />
          </div>
        )}
      </div>
    </div>
  );
}

// Componente de edição do Portfólio 1
function Portfolio1Editor({ data }: { data: Portfolio1Data }) {
  const [portfolioData, setPortfolioData] = useState(data);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [editingWorkIndex, setEditingWorkIndex] = useState<number | null>(null);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isAddingTech, setIsAddingTech] = useState(false);
  
  // Estados temporários para edição de projetos
  const [tempProject, setTempProject] = useState<Portfolio1Data['projects'][0] | null>(null);
  
  // Estados temporários para edição de experiência
  const [tempWork, setTempWork] = useState<Portfolio1Data['workHistory'][0] | null>(null);

  // Apply CSS variables for the theme
  const themeStyles = {
    '--main-color': portfolioData.mainColor,
    backgroundColor: portfolioData.theme === 'DARK' ? '#09090b' : '#ffffff',
    color: portfolioData.theme === 'DARK' ? '#fafafa' : '#18181b',
  } as React.CSSProperties;

  return (
    <div className="min-h-screen transition-colors duration-300" style={themeStyles}>
      
      {/* Floating Theme Button */}
      <div className="fixed top-24 right-6 z-40">
          <Button 
            onClick={() => setIsThemeOpen(true)}
            className="rounded-full shadow-lg w-12 h-12 p-0 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:scale-110 transition-transform"
            style={{ color: portfolioData.mainColor }}
          >
             <Palette size={20} />
          </Button>
      </div>

      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
        style={{
            background: portfolioData.theme === 'DARK' 
                ? 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #09090b 100%)' 
                : 'radial-gradient(circle at 50% 50%, #eff6ff 0%, #ffffff 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Imagem de Perfil */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <EditableWrapper
                value={portfolioData.hero.avatarUrl}
                onChange={(newValue) =>
                  setPortfolioData({
                    ...portfolioData,
                    hero: { ...portfolioData.hero, avatarUrl: newValue },
                  })
                }
                type="image"
                label="Editar Avatar"
              >
                <img
                  src={portfolioData.hero.avatarUrl}
                  alt="Desenvolvedor"
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-2xl"
                />
              </EditableWrapper>
              <div 
                  className="absolute inset-0 rounded-full opacity-20" 
                  style={{ backgroundColor: portfolioData.mainColor }}
              ></div>
            </div>
          </div>

          {/* Greeting */}
          <EditableWrapper
            value={portfolioData.hero.greeting}
            onChange={(newValue) =>
              setPortfolioData({
                ...portfolioData,
                hero: { ...portfolioData.hero, greeting: newValue },
              })
            }
            type="text"
            label="Editar Saudação"
          >
            <p className="font-medium mb-4" style={{ color: portfolioData.mainColor }}>{portfolioData.hero.greeting}</p>
          </EditableWrapper>

          {/* Name */}
          <EditableWrapper
            value={portfolioData.hero.name}
            onChange={(newValue) =>
              setPortfolioData({
                ...portfolioData,
                hero: { ...portfolioData.hero, name: newValue },
              })
            }
            type="text"
            label="Editar Nome"
          >
            <h1 
                className="text-5xl md:text-7xl mb-6"
                style={{ 
                    color: portfolioData.mainColor 
                }}
            >
              {portfolioData.hero.name}
            </h1>
          </EditableWrapper>

          {/* Tagline */}
          <EditableWrapper
            value={portfolioData.hero.tagline}
            onChange={(newValue) =>
              setPortfolioData({
                ...portfolioData,
                hero: { ...portfolioData.hero, tagline: newValue },
              })
            }
            type="text"
            label="Editar Tagline"
          >
            <p className={`text-2xl md:text-3xl mb-8 ${portfolioData.theme === 'DARK' ? 'text-gray-300' : 'text-gray-700'}`}>
              {portfolioData.hero.tagline}
            </p>
          </EditableWrapper>

          {/* Description */}
          <EditableWrapper
            value={portfolioData.hero.description}
            onChange={(newValue) =>
              setPortfolioData({
                ...portfolioData,
                hero: { ...portfolioData.hero, description: newValue },
              })
            }
            type="text"
            label="Editar Descrição"
          >
            <p className={`max-w-2xl mx-auto mb-10 ${portfolioData.theme === 'DARK' ? 'text-gray-400' : 'text-gray-600'}`}>
              {portfolioData.hero.description}
            </p>
          </EditableWrapper>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projetos"
              className="px-8 py-3 text-white rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ backgroundColor: portfolioData.mainColor }}
            >
              Ver Projetos
            </a>
            <a
              href="#contato"
              className="px-8 py-3 bg-transparent border-2 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ 
                  borderColor: portfolioData.mainColor,
                  color: portfolioData.theme === 'DARK' ? '#ffffff' : portfolioData.mainColor
              }}
            >
              Entre em Contato
            </a>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section 
        className="py-20 px-6 transition-colors duration-300"
        style={{ backgroundColor: portfolioData.theme === 'DARK' ? '#09090b' : '#ffffff' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <EditableWrapper
              value={portfolioData.techStack.title}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  techStack: { ...portfolioData.techStack, title: newValue },
                })
              }
              type="text"
              label="Editar Título"
            >
              <h2 
                className="text-4xl md:text-5xl mb-4"
                style={{ color: portfolioData.mainColor }}
              >
                {portfolioData.techStack.title}
              </h2>
            </EditableWrapper>
            <EditableWrapper
              value={portfolioData.techStack.subtitle}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  techStack: { ...portfolioData.techStack, subtitle: newValue },
                })
              }
              type="text"
              label="Editar Subtítulo"
            >
              <p className={portfolioData.theme === 'DARK' ? 'text-gray-400' : 'text-gray-600'}>{portfolioData.techStack.subtitle}</p>
            </EditableWrapper>
          </div>

          {/* Grade de tecnologias */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {portfolioData.techStack.technologies.map((tech, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center justify-center p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer group"
                style={{ 
                    background: portfolioData.theme === 'DARK' 
                        ? 'linear-gradient(to bottom right, #1e293b, #0f172a)' 
                        : 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)',
                    border: portfolioData.theme === 'DARK' ? '1px solid #1e293b' : 'none'
                }}
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:bg-red-50"
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            const newTechs = portfolioData.techStack.technologies.filter((_, i) => i !== index);
                            setPortfolioData({
                                ...portfolioData,
                                techStack: { ...portfolioData.techStack, technologies: newTechs }
                            });
                        }}
                    >
                        <X size={14} />
                    </Button>
                </div>
                <div className="mb-3 group-hover:scale-110 transition-transform">
                  <Icon icon={tech.icon} width="40" height="40" />
                </div>
                <span className={`font-medium ${portfolioData.theme === 'DARK' ? 'text-gray-300' : 'text-gray-700'}`}>{tech.name}</span>
              </div>
            ))}
            
            {/* Botão Adicionar */}
            <div 
                onClick={() => setIsAddingTech(true)}
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer group"
                style={{ 
                    borderColor: portfolioData.theme === 'DARK' ? '#1e293b' : '#e5e7eb',
                    backgroundColor: portfolioData.theme === 'DARK' ? '#0f172a' : 'transparent'
                }}
            >
                <div 
                    className="mb-3 p-3 rounded-full group-hover:scale-110 transition-transform"
                    style={{ 
                        backgroundColor: portfolioData.theme === 'DARK' ? 'rgba(59, 130, 246, 0.1)' : '#dbeafe',
                        color: portfolioData.mainColor 
                    }}
                >
                    <Plus size={24} />
                </div>
                <span className="text-gray-500 group-hover:text-blue-600 font-medium">Adicionar</span>
            </div>
          </div>
          
          <AddTechDialog 
            open={isAddingTech} 
            onOpenChange={setIsAddingTech}
            onAdd={(newTech) => {
                setPortfolioData({
                    ...portfolioData,
                    techStack: {
                        ...portfolioData.techStack,
                        technologies: [...portfolioData.techStack.technologies, newTech]
                    }
                });
                toast.success('Tecnologia adicionada!');
            }}
          />
        </div>
      </section>

      {/* Work History Section */}
      <section 
        id="experiencia" 
        className="py-20 px-6 transition-colors duration-300"
        style={{ 
            background: portfolioData.theme === 'DARK' 
                ? 'linear-gradient(to bottom, #0f172a, #09090b)' 
                : 'linear-gradient(to bottom, #f9fafb, #ffffff)' 
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
                className="text-4xl mb-4"
                style={{ color: portfolioData.mainColor }}
            >
              Experiência Profissional
            </h2>
            <p className={`max-w-2xl mx-auto mb-6 ${portfolioData.theme === 'DARK' ? 'text-gray-400' : 'text-gray-600'}`}>
              Histórico de projetos e empresas onde apliquei minhas habilidades para criar soluções impactantes
            </p>
            <Button
              onClick={() => {
                const newWork = {
                  company: 'Nova Empresa',
                  period: '2024 - Atual',
                  summary: 'Descrição da experiência profissional',
                  technologies: ['React', 'TypeScript'],
                  responsibilities: ['Responsabilidade 1', 'Responsabilidade 2'],
                  impact: 'Impacto alcançado',
                };
                setPortfolioData({
                  ...portfolioData,
                  workHistory: [...portfolioData.workHistory, newWork],
                });
                toast.success('Nova experiência adicionada!');
              }}
              className="text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: portfolioData.mainColor }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Experiência
            </Button>
          </div>

          <div className="relative">
            <div 
                className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full"
                style={{ backgroundColor: portfolioData.mainColor }}
            ></div>
            <div className="space-y-12">
              {portfolioData.workHistory.map((work, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
                    <div 
                        className="rounded-lg shadow-lg p-6 border transition-colors duration-300 relative group"
                        style={{ 
                            backgroundColor: portfolioData.theme === 'DARK' ? '#1e293b' : '#ffffff',
                            borderColor: portfolioData.theme === 'DARK' ? '#334155' : '#f3f4f6'
                        }}
                    >
                      <div className="absolute top-2 right-2 flex gap-2 z-10">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingWorkIndex(index);
                            setTempWork({ ...work });
                          }}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-600"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newHistory = portfolioData.workHistory.filter((_, i) => i !== index);
                            setPortfolioData({ ...portfolioData, workHistory: newHistory });
                            toast.success('Experiência removida!');
                          }}
                          className="bg-red-50 hover:bg-red-100 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <h3 className={`text-xl mb-2 ${portfolioData.theme === 'DARK' ? 'text-gray-100' : 'text-gray-900'}`}>{work.company}</h3>

                      <div className={`flex items-center gap-2 text-sm ${index % 2 === 0 ? '' : 'md:justify-end'} mb-4`} style={{ color: portfolioData.mainColor }}>
                        <Calendar className="w-4 h-4" />
                        <span>{work.period}</span>
                      </div>

                      <p className={`mb-4 leading-relaxed ${portfolioData.theme === 'DARK' ? 'text-gray-300' : 'text-gray-700'}`}>{work.summary}</p>

                      {/* Tecnologias */}
                      <div className="mb-4">
                        <h4 className="text-sm text-gray-900 mb-2">Tecnologias:</h4>
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                          {work.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Responsabilidades */}
                      <div className="mb-4">
                        <h4 className={`text-sm mb-2 ${portfolioData.theme === 'DARK' ? 'text-gray-100' : 'text-gray-900'}`}>Responsabilidades:</h4>
                        <ul className={`space-y-1 text-sm ${portfolioData.theme === 'DARK' ? 'text-gray-300' : 'text-gray-700'} ${index % 2 === 0 ? 'list-disc list-inside' : 'md:list-none'}`}>
                          {work.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="leading-relaxed">
                              {index % 2 !== 0 && <span className="md:inline hidden">• </span>}
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Impacto */}
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className={`text-sm mb-2 ${portfolioData.theme === 'DARK' ? 'text-gray-100' : 'text-gray-900'}`}>Impacto:</h4>
                        <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">{work.impact}</p>
                      </div>
                    </div>
                  </div>
                  {/* Ícone central (visível apenas em desktop) */}
                  <div 
                    className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full items-center justify-center shadow-lg"
                    style={{ backgroundColor: portfolioData.mainColor }}
                  >
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>

                  {/* Espaço vazio do outro lado (apenas desktop) */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicador de início da carreira */}
          <div className="text-center mt-12">
            <div 
                className="inline-block px-6 py-3 text-white rounded-full shadow-lg"
                style={{ backgroundColor: portfolioData.mainColor }}
            >
              Início da Jornada
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projetos" 
        className="py-20 px-6 transition-colors duration-300"
        style={{ 
            background: portfolioData.theme === 'DARK' 
                ? 'linear-gradient(to bottom right, #09090b, #111827)' 
                : 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 
                className="text-4xl md:text-5xl mb-4"
                style={{ color: portfolioData.mainColor }}
            >
                Projetos
            </h2>
            <p className="text-gray-600 mb-6">
              Alguns dos meus trabalhos recentes
            </p>
            <Button
              onClick={() => {
                  const newProject = {
                  nome: 'Novo Projeto',
                  descricao: 'Descrição do projeto',
                  gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHY5b3BkcHVucXVtOWt6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif',
                };
                setPortfolioData({
                  ...portfolioData,
                  projects: [...portfolioData.projects, newProject],
                });
                toast.success('Novo projeto adicionado!');
              }}
              className="text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: portfolioData.mainColor }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Projeto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative"
              >
                <div className="absolute top-2 right-2 flex gap-2 z-20">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingProjectIndex(index);
                      setTempProject({ ...project });
                    }}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newProjects = portfolioData.projects.filter((_, i) => i !== index);
                      setPortfolioData({ ...portfolioData, projects: newProjects });
                      toast.success('Projeto removido!');
                    }}
                    className="bg-red-50 hover:bg-red-100 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {/* GIF do projeto */}
                <div className="relative overflow-hidden h-56 bg-gradient-to-br from-blue-100 to-purple-100">
                  <img
                    src={project.gif}
                    alt={project.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Conteúdo do card */}
                <div className="p-6">
                  <h3 
                    className="mb-3 text-xl font-bold"
                    style={{ color: portfolioData.mainColor }}
                  >
                    {project.nome}
                  </h3>
                  <p className={`mb-6 ${portfolioData.theme === 'DARK' ? 'text-gray-300' : 'text-black'}`}>{project.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer 
        id="contato" 
        className="py-12 px-6 transition-colors duration-300"
        style={{ 
            backgroundColor: portfolioData.theme === 'DARK' ? '#09090b' : '#111827',
            color: '#ffffff'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <EditableWrapper
              value={portfolioData.footer.title}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  footer: { ...portfolioData.footer, title: newValue },
                })
              }
              type="text"
              label="Editar Título"
            >
              <h2 className="text-3xl md:text-4xl mb-4">{portfolioData.footer.title}</h2>
            </EditableWrapper>
            <EditableWrapper
              value={portfolioData.footer.subtitle}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  footer: { ...portfolioData.footer, subtitle: newValue },
                })
              }
              type="text"
              label="Editar Subtítulo"
            >
              <p className="text-gray-400 mb-8">{portfolioData.footer.subtitle}</p>
            </EditableWrapper>
            <EditableWrapper
              value={portfolioData.footer.email}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  footer: { ...portfolioData.footer, email: newValue },
                })
              }
              type="text"
              label="Editar Email"
            >
              <a
                href={`mailto:${portfolioData.footer.email}`}
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg"
              >
                {portfolioData.footer.email}
              </a>
            </EditableWrapper>
          </div>

          {/* Redes sociais */}
          <div className="flex justify-center gap-6 mb-8">
            <EditableWrapper
              value={portfolioData.footer.github}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  footer: { ...portfolioData.footer, github: newValue },
                })
              }
              type="text"
              label="Editar Link do GitHub"
            >
              <a
                href={portfolioData.footer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
            </EditableWrapper>
            <EditableWrapper
              value={portfolioData.footer.linkedin}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  footer: { ...portfolioData.footer, linkedin: newValue },
                })
              }
              type="text"
              label="Editar Link do LinkedIn"
            >
              <a
                href={portfolioData.footer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </EditableWrapper>
            <EditableWrapper
              value={portfolioData.footer.twitter}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  footer: { ...portfolioData.footer, twitter: newValue },
                })
              }
              type="text"
              label="Editar Link do Twitter"
            >
              <a
                href={portfolioData.footer.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </EditableWrapper>
            <a
              href={`mailto:${portfolioData.footer.email}`}
              className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>

          {/* Divisor */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <EditableWrapper
                value={portfolioData.footer.copyrightName}
                onChange={(newValue) =>
                  setPortfolioData({
                    ...portfolioData,
                    footer: { ...portfolioData.footer, copyrightName: newValue },
                  })
                }
                type="text"
                label="Editar Nome do Copyright"
              >
                <p className="text-gray-400 text-center md:text-left">
                  © {new Date().getFullYear()} {portfolioData.footer.copyrightName}. Todos os direitos reservados.
                </p>
              </EditableWrapper>

              {/* Frase com emoji (Editável) */}
              <EditableWrapper
                value={portfolioData.footer.madeWith}
                onChange={(newValue) =>
                  setPortfolioData({
                    ...portfolioData,
                    footer: { ...portfolioData.footer, madeWith: newValue },
                  })
                }
                type="text"
                label="Editar Texto de Créditos"
              >
                <p className="text-gray-400 flex items-center gap-2">
                  {portfolioData.footer.madeWith}
                </p>
              </EditableWrapper>
            </div>
          </div>
        </div>
      </footer>

      {/* Dialog para editar experiência profissional */}
      <Dialog open={editingWorkIndex !== null} onOpenChange={(open: boolean) => !open && setEditingWorkIndex(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Experiência Profissional</DialogTitle>
          </DialogHeader>
          {tempWork && (
            <div className="space-y-4 mt-4">
              <div>
                <Label>Empresa</Label>
                <Input
                  value={tempWork.company}
                  onChange={(e) => setTempWork({ ...tempWork, company: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Período</Label>
                <Input
                  value={tempWork.period}
                  onChange={(e) => setTempWork({ ...tempWork, period: e.target.value })}
                  className="mt-2"
                  placeholder="2023 - Atual"
                />
              </div>
              <div>
                <Label>Resumo</Label>
                <Textarea
                  value={tempWork.summary}
                  onChange={(e) => setTempWork({ ...tempWork, summary: e.target.value })}
                  className="mt-2 min-h-[100px]"
                />
              </div>
              <div>
                <Label>Tecnologias (separadas por vírgula)</Label>
                <Input
                  value={tempWork.technologies.join(', ')}
                  onChange={(e) =>
                    setTempWork({
                      ...tempWork,
                      technologies: e.target.value.split(',').map((t) => t.trim()).filter((t) => t),
                    })
                  }
                  className="mt-2"
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
              <div>
                <Label>Responsabilidades (uma por linha)</Label>
                <Textarea
                  value={tempWork.responsibilities.join('\n')}
                  onChange={(e) =>
                    setTempWork({
                      ...tempWork,
                      responsibilities: e.target.value.split('\n').filter((r) => r.trim()),
                    })
                  }
                  className="mt-2 min-h-[100px]"
                  placeholder="Responsabilidade 1&#10;Responsabilidade 2"
                />
              </div>
              <div>
                <Label>Impacto</Label>
                <Textarea
                  value={tempWork.impact}
                  onChange={(e) => setTempWork({ ...tempWork, impact: e.target.value })}
                  className="mt-2 min-h-[80px]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingWorkIndex(null)}>
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    if (editingWorkIndex !== null) {
                      const newHistory = [...portfolioData.workHistory];
                      newHistory[editingWorkIndex] = tempWork;
                      setPortfolioData({ ...portfolioData, workHistory: newHistory });
                      setEditingWorkIndex(null);
                      toast.success('Experiência atualizada!');
                    }
                  }}
                >
                  Salvar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para editar projetos */}
      <Dialog open={editingProjectIndex !== null} onOpenChange={(open: boolean) => !open && setEditingProjectIndex(null)}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Editar Projeto</DialogTitle>
                <DialogDescription>
                    Edite as informações do seu projeto.
                </DialogDescription>
            </DialogHeader>
            {tempProject && (
                <div className="space-y-4 mt-4">
                    <div>
                        <Label>Nome do Projeto</Label>
                        <Input
                            value={tempProject.nome}
                            onChange={(e) => setTempProject({ ...tempProject, nome: e.target.value })}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label>Descrição</Label>
                        <Textarea
                            value={tempProject.descricao}
                            onChange={(e) => setTempProject({ ...tempProject, descricao: e.target.value })}
                            className="mt-2 min-h-[100px]"
                        />
                    </div>
                    <div>
                        <Label>URL do GIF/Imagem</Label>
                        <Input
                            value={tempProject.gif}
                            onChange={(e) => setTempProject({ ...tempProject, gif: e.target.value })}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setEditingProjectIndex(null)}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => {
                                if (editingProjectIndex !== null) {
                                    const newProjects = [...portfolioData.projects];
                                    newProjects[editingProjectIndex] = tempProject;
                                    setPortfolioData({ ...portfolioData, projects: newProjects });
                                    setEditingProjectIndex(null);
                                    toast.success('Projeto atualizado!');
                                }
                            }}
                        >
                            Salvar
                        </Button>
                    </div>
                </div>
            )}
        </DialogContent>
      </Dialog>

      <ThemeCustomizer 
         open={isThemeOpen}
         onOpenChange={setIsThemeOpen}
         theme={portfolioData.theme}
         mainColor={portfolioData.mainColor}
         onThemeChange={(t) => setPortfolioData({...portfolioData, theme: t})}
         onColorChange={(c) => setPortfolioData({...portfolioData, mainColor: c})}
      />
    </div>
  );
}

// Componente de edição do Portfólio 2
function Portfolio2Editor({ data }: { data: Portfolio2Data }) {
  const [portfolioData, setPortfolioData] = useState(data);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null);
  const [isAddingTech, setIsAddingTech] = useState(false);
  
  // Estados temporários para edição
  const [tempProject, setTempProject] = useState<Portfolio2Data['projects'][0] | null>(null);
  const [tempExperience, setTempExperience] = useState<Portfolio2Data['experience'][0] | null>(null);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#050505] overflow-x-hidden text-slate-200">
      <main className="w-full max-w-md md:max-w-xl lg:max-w-2xl z-10 px-6 py-10 flex flex-col gap-6">
        {/* Profile Card */}
        <div className="bg-[#121318] rounded-[2rem] p-6 sm:p-8 border border-white/5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <EditableWrapper
                value={portfolioData.profile.avatarUrl}
                onChange={(newValue) =>
                  setPortfolioData({
                    ...portfolioData,
                    profile: { ...portfolioData.profile, avatarUrl: newValue },
                  })
                }
                type="image"
                label="Editar Avatar"
              >
                <div className="relative group">
                  <div className="relative w-40 h-40 mx-auto bg-[#fbbf24] rounded-full border-4 border-[#121318] overflow-hidden shadow-xl">
                    <img 
                      src={portfolioData.profile.avatarUrl} 
                      alt={portfolioData.profile.name} 
                      className="w-full h-full object-cover pt-2"
                    />
                  </div>
                </div>
              </EditableWrapper>
            </div>

            <div className="flex-1 text-center sm:text-left mt-2">
              {/* Name */}
              <EditableWrapper
                value={portfolioData.profile.name}
                onChange={(newValue) =>
                  setPortfolioData({
                    ...portfolioData,
                    profile: { ...portfolioData.profile, name: newValue },
                  })
                }
                type="text"
                label="Editar Nome"
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                  {portfolioData.profile.name}
                </h1>
              </EditableWrapper>

              {/* Role */}
              <EditableWrapper
                value={portfolioData.profile.role}
                onChange={(newValue) =>
                  setPortfolioData({
                    ...portfolioData,
                    profile: { ...portfolioData.profile, role: newValue },
                  })
                }
                type="text"
                label="Editar Cargo"
              >
                <p className="text-yellow-500 font-medium text-sm mb-4">
                  {portfolioData.profile.role}
                </p>
              </EditableWrapper>

              {/* Tagline and Location */}
              <div className="flex flex-col gap-2 mb-4">
                <EditableWrapper
                  value={portfolioData.profile.tagline}
                  onChange={(newValue) =>
                    setPortfolioData({
                      ...portfolioData,
                      profile: { ...portfolioData.profile, tagline: newValue },
                    })
                  }
                  type="text"
                  label="Editar Tagline"
                >
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <User size={16} className="text-yellow-500" />
                    <span className="font-medium tracking-wide">{portfolioData.profile.tagline}</span>
                  </div>
                </EditableWrapper>

                <EditableWrapper
                  value={portfolioData.profile.location}
                  onChange={(newValue) =>
                    setPortfolioData({
                      ...portfolioData,
                      profile: { ...portfolioData.profile, location: newValue },
                    })
                  }
                  type="text"
                  label="Editar Localização"
                >
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <MapPin size={16} className="text-red-500" />
                    <span className="font-medium tracking-wide">{portfolioData.profile.location}</span>
                  </div>
                </EditableWrapper>
              </div>

              {/* Open to work badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Open to work
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section - Moved Up */}
        <section className="grid grid-cols-2 gap-4">
          {portfolioData.socialLinks.map((link, index) => {
            const IconComponent = {
              github: Github,
              email: Mail,
              facebook: Facebook,
              figma: Figma,
              dev: Code2,
            }[link.id] || Github;

            const textColor = link.textColorClass || 'text-white';
            const subTextColor = link.textColorClass ? 'text-gray-600' : 'text-gray-400';

            return (
              <EditableWrapper
                key={link.id}
                value={link.url}
                onChange={(newValue) => {
                  const newLinks = [...portfolioData.socialLinks];
                  newLinks[index] = { ...link, url: newValue };
                  setPortfolioData({ ...portfolioData, socialLinks: newLinks });
                }}
                type="text"
                label="Editar URL"
              >
                <a 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    ${link.colSpan === 2 ? 'col-span-2' : 'col-span-1'}
                    ${link.colorClass}
                    relative p-6 rounded-3xl transition-all duration-300 hover:scale-[1.02] active:scale-95
                    flex flex-col justify-between
                    shadow-md
                    h-40
                    group
                    overflow-hidden
                    border border-white/5
                  `}
                >
                  <div className="flex justify-between items-start z-10">
                    <div className={`p-2.5 rounded-xl ${link.id === 'dev' ? 'bg-black text-white' : 'bg-white/10'}`}>
                      <IconComponent size={22} className={link.id === 'dev' ? 'text-white' : 'text-white'} />
                    </div>
                    <div className={`p-1.5 rounded-full ${link.id === 'dev' ? 'bg-gray-200' : 'bg-white/10'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <ArrowUpRight size={18} className={link.id === 'dev' ? 'text-black' : 'text-white'} />
                    </div>
                  </div>

                  <div className="z-10">
                    {link.id === 'github' && (
                      <span className="mb-2 inline-block px-2.5 py-0.5 text-[10px] font-bold bg-white text-black rounded uppercase tracking-wider">Follow</span>
                    )}
                    <EditableWrapper
                      value={link.name}
                      onChange={(newValue) => {
                        const newLinks = [...portfolioData.socialLinks];
                        newLinks[index] = { ...link, name: newValue };
                        setPortfolioData({ ...portfolioData, socialLinks: newLinks });
                      }}
                      type="text"
                      label="Editar Nome"
                    >
                      <h3 className={`font-bold text-lg ${textColor}`}>{link.name}</h3>
                    </EditableWrapper>
                    <EditableWrapper
                      value={link.handle}
                      onChange={(newValue) => {
                        const newLinks = [...portfolioData.socialLinks];
                        newLinks[index] = { ...link, handle: newValue };
                        setPortfolioData({ ...portfolioData, socialLinks: newLinks });
                      }}
                      type="text"
                      label="Editar Handle"
                    >
                      <p className={`text-xs ${subTextColor} font-medium truncate mt-0.5`}>{link.handle}</p>
                    </EditableWrapper>
                  </div>
                </a>
              </EditableWrapper>
            );
          })}
        </section>

        {/* Experience Section */}
        <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
            Experience
          </h2>
          <div className="relative border-l border-gray-800 ml-3 space-y-8">
            {portfolioData.experience.map((item, index) => (
              <div key={item.id} className="ml-6 relative group">
                {/* Dot on timeline */}
                <span className={`absolute -left-[1.95rem] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#121318] ${item.current ? 'bg-yellow-500 animate-pulse' : 'bg-gray-600'}`}></span>
                
                <div className="flex justify-end gap-2 mb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingExperienceIndex(index);
                      setTempExperience({ ...item });
                    }}
                    className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newExp = portfolioData.experience.filter((_, i) => i !== index);
                      setPortfolioData({ ...portfolioData, experience: newExp });
                      toast.success('Experiência removida!');
                    }}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                  <h3 className="text-white font-semibold text-lg">{item.role}</h3>
                  <time className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">{item.date}</time>
                </div>
                
                <p className="text-yellow-500/90 text-sm font-medium mb-2">{item.company}</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
            <h2 className="text-xl font-bold text-white">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolioData.projects.map((project, index) => (
              <div key={project.id} className="bg-[#18181b] p-5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors group relative">
                <div className="absolute top-2 right-2 flex gap-2 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingProjectIndex(index);
                      setTempProject({ ...project });
                    }}
                    className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newProjects = portfolioData.projects.filter((_, i) => i !== index);
                      setPortfolioData({ ...portfolioData, projects: newProjects });
                      toast.success('Projeto removido!');
                    }}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-white/5 rounded-lg text-yellow-500">
                    <FolderGit2 size={20} />
                  </div>
                </div>
                
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">{project.nome}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.descricao}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => {
                const newProject = {
                  id: `p${portfolioData.projects.length + 1}`,
                  nome: 'Novo Projeto',
                  descricao: 'Descrição do projeto',
                  gif: '',
                };
                setPortfolioData({
                  ...portfolioData,
                  projects: [...portfolioData.projects, newProject],
                });
                toast.success('Novo projeto adicionado!');
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Projeto
            </Button>
          </div>
        </section>

        {/* Tech Stack Section */}
        <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {portfolioData.techStack.map((tech, index) => (
              <div
                key={index}
                className="group relative px-4 py-2 bg-[#18181b] hover:bg-[#202025] text-gray-300 font-medium rounded-xl border border-white/5 hover:border-yellow-500/30 transition-all cursor-default text-sm flex items-center gap-2"
              >
                 <Icon icon={tech.icon} className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                 <span className="group-hover:text-white">{tech.name}</span>
                 <button 
                    onClick={() => {
                        const newTechs = portfolioData.techStack.filter((_, i) => i !== index);
                        setPortfolioData({ ...portfolioData, techStack: newTechs });
                    }}
                    className="ml-1 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                 >
                    <X size={14} />
                 </button>
              </div>
            ))}
             <button
                onClick={() => setIsAddingTech(true)}
                className="px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 font-medium rounded-xl border border-yellow-500/20 transition-all text-sm flex items-center gap-2"
              >
                <Plus size={16} />
                Add Tech
              </button>
          </div>
          <AddTechDialog 
            open={isAddingTech} 
            onOpenChange={setIsAddingTech}
            onAdd={(newTech) => {
                setPortfolioData({
                    ...portfolioData,
                    techStack: [...portfolioData.techStack, { name: newTech.name, icon: newTech.icon }]
                });
                toast.success('Stack adicionada!');
            }}
          />
        </div>
      </main>
    </div>
  );
}

