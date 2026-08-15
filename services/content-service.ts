import { news, programs, site } from "@/data/public";

export type ContentKind = "programs" | "news" | "events" | "teachers";

export type ContentEntity = {
  id: string;
  title?: string;
  description?: string;
  excerpt?: string;
  content?: string;
  slug?: string;
  category?: string;
  publishedAt?: string;
  status?: "DRAFT" | "PUBLISHED";
  age?: string;
  duration?: string;
  format?: string;
  teacher?: string;
  location?: string;
  date?: string;
  name?: string;
  subject?: string;
  position?: string;
  experience?: string;
  phone?: string;
  address?: string;
  city?: string;
  email?: string;
};

const seedStorage: Record<ContentKind, ContentEntity[]> = {
  programs: programs.map((item, index) => ({
    id: `program-${index + 1}`,
    title: item.title,
    description: item.description,
    age: item.age,
    duration: item.duration,
    format: item.format,
    teacher: item.teacher,
  })),
  news: news.map((item, index) => ({
    id: `news-${index + 1}`,
    title: item.title,
    excerpt: item.excerpt,
    content: item.content,
    slug: item.slug,
    category: item.category,
    publishedAt: item.publishedAt,
    status: item.status,
  })),
  events: [
    {
      id: "event-1",
      title: "Открытый день медресе",
      description: "День знакомства с учебными программами и преподавателями.",
      date: "12 сентября 2026",
      location: "Беловодск",
    },
    {
      id: "event-2",
      title: "Семинар по нравственному воспитанию",
      description: "Встреча с родителями и наставниками о духовном развитии.",
      date: "20 октября 2026",
      location: "Медресе",
    },
  ],
  teachers: [
    {
      id: "teacher-1",
      title: "Бахадыр устаз",
      name: "Бахадыр устаз",
      subject: "Коран и таджвид",
      position: "Преподаватель",
      experience: "8 лет",
    },
    {
      id: "teacher-2",
      title: "Тир дамла",
      name: "Тир дамла",
      subject: "Фикх и акида",
      position: "Преподаватель",
      experience: "12 лет",
    },
  ],
};

const store = globalThis as typeof globalThis & {
  medreseContentStore?: Record<ContentKind, ContentEntity[]>;
};

if (!store.medreseContentStore) {
  store.medreseContentStore = structuredClone(seedStorage);
}

export function listContent(kind: ContentKind) {
  return store.medreseContentStore![kind];
}

export function createContent(kind: ContentKind, payload: Partial<ContentEntity>) {
  const items = store.medreseContentStore![kind];
  const id = payload.id ?? `${kind}-${Date.now()}`;
  const item: ContentEntity = {
    id,
    title: payload.title ?? payload.name ?? "Новый элемент",
    description: payload.description ?? "",
    excerpt: payload.excerpt ?? payload.description ?? "",
    content: payload.content ?? payload.description ?? "",
    slug: payload.slug ?? id,
    category: payload.category ?? "Общее",
    publishedAt: payload.publishedAt ?? new Date().toISOString().slice(0, 10),
    status: payload.status ?? "PUBLISHED",
    age: payload.age ?? "18+",
    duration: payload.duration ?? "По согласованию",
    format: payload.format ?? "Онлайн/офлайн",
    teacher: payload.teacher ?? "",
    location: payload.location ?? site.city,
    date: payload.date ?? new Date().toISOString().slice(0, 10),
    name: payload.name ?? payload.title ?? "",
    subject: payload.subject ?? payload.description ?? "",
    position: payload.position ?? "",
    experience: payload.experience ?? "",
    phone: payload.phone ?? site.phone,
    address: payload.address ?? site.address,
    city: payload.city ?? site.city,
    email: payload.email ?? "info@medrese.kg",
  };

  items.unshift(item);
  return item;
}

export function updateContent(kind: ContentKind, id: string, payload: Partial<ContentEntity>) {
  const items = store.medreseContentStore![kind];
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) return null;

  items[index] = {
    ...items[index],
    ...payload,
    id,
  };

  return items[index];
}

export function deleteContent(kind: ContentKind, id: string) {
  const items = store.medreseContentStore![kind];
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}
