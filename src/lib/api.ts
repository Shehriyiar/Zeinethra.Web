const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://zeinethra-api-production.up.railway.app";

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string | null;
  errors?: unknown;
};

export type Paged<T> = {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

async function request<T>(path: string, init?: RequestInit & { token?: string; revalidate?: number | false }): Promise<T> {
  const { token, revalidate = 60, ...rest } = init || {};
  const isMutation = Boolean(rest.method && rest.method !== "GET");
  const shouldRevalidate = typeof window === "undefined" && !isMutation && revalidate !== false;
  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(rest.headers || {}),
    },
    ...(shouldRevalidate
      ? { next: { revalidate: typeof revalidate === "number" ? revalidate : 60 } }
      : { cache: "no-store" as RequestCache }),
  });

  if (!res.ok) {
    const text = await res.text();
    try {
      const parsed = JSON.parse(text) as { message?: string; title?: string; errors?: Record<string, string[]> };
      const firstError = parsed.errors ? Object.values(parsed.errors).flat()[0] : undefined;
      throw new Error(firstError || parsed.message || parsed.title || `Request failed: ${res.status}`);
    } catch (e) {
      if (e instanceof Error && !e.message.startsWith("{") && e.message !== text) throw e;
      throw new Error(text || `Request failed: ${res.status}`);
    }
  }

  const json = (await res.json()) as ApiResponse<T>;
  if (!json.success) throw new Error(json.message || "API error");
  return json.data;
}

export const api = {
  baseUrl: API_BASE,
  getPages: () => request<Paged<PageDto>>("/api/pages?page=1&pageSize=20"),
  getPage: (slug: string) => request<PageDto>(`/api/pages/${slug}`),
  getArticles: () => request<Paged<ArticleDto>>("/api/articles?page=1&pageSize=6"),
  getArticle: (slug: string) => request<ArticleDto>(`/api/articles/${slug}`),
  getProducts: () => request<Paged<ProductDto>>("/api/products?page=1&pageSize=20"),
  getProduct: (slug: string) => request<ProductDto>(`/api/products/${slug}`),
  getTour: (slug: string) => request<TourStepDto[]>(`/api/products/${slug}/tour`),
  getIndustries: () => request<Paged<IndustryDto>>("/api/industries?page=1&pageSize=20"),
  getFaqs: () => request<Paged<FaqDto>>("/api/faqs?page=1&pageSize=50"),
  getTeam: () => request<Paged<TeamDto>>("/api/team?page=1&pageSize=20"),
  getCaseStudies: () => request<Paged<CaseStudyDto>>("/api/case-studies?page=1&pageSize=12"),
  getJobs: () => request<Paged<JobDto>>("/api/careers?page=1&pageSize=20&openOnly=true"),
  getResources: () => request<Paged<ResourceDto>>("/api/resources?page=1&pageSize=20"),
  submitEnquiry: (body: EnquiryPayload) =>
    request<EnquiryDto>("/api/enquiries", { method: "POST", body: JSON.stringify(body) }),
  saveEnquiryDraft: (body: Record<string, unknown>) =>
    request<EnquiryDto>("/api/enquiries/draft", { method: "POST", body: JSON.stringify(body) }),
  bookDemo: (body: BookingPayload) =>
    request<unknown>("/api/bookings", { method: "POST", body: JSON.stringify(body) }),
  newsletter: (email: string, fullName?: string) =>
    request<unknown>("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email, fullName, source: "website" }),
    }),
  chat: (message: string, sessionId?: string) =>
    request<{ reply: string; sessionId: string }>("/api/ai/chat", {
      method: "POST",
      body: JSON.stringify({ message, sessionId, history: [] }),
    }),
  search: (query: string) =>
    request<{ results: SearchItem[] }>("/api/ai/search", {
      method: "POST",
      body: JSON.stringify({ query, limit: 8 }),
    }),
  recommend: (answers: Record<string, string>) =>
    request<RecommendDto>("/api/ai/recommend", {
      method: "POST",
      body: JSON.stringify({ answers }),
    }),
  roi: (payload: RoiPayload) =>
    request<RoiDto>("/api/ai/roi", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  consent: (payload: ConsentPayload) =>
    request<unknown>("/api/consent", { method: "POST", body: JSON.stringify(payload) }),
  logEvent: (eventName: string, pageUrl?: string) =>
    request<unknown>("/api/analytics/events", {
      method: "POST",
      body: JSON.stringify({ eventName, source: "web", pageUrl, sessionId: "web" }),
    }),
  login: (email: string, password: string) =>
    request<TokenResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  getEnquiriesAdmin: (token: string) =>
    request<Paged<EnquiryAdminDto>>("/api/enquiries?page=1&pageSize=50", { token, revalidate: false }),
  getArticlesAdmin: (token: string) =>
    request<Paged<ArticleDto>>("/api/articles?page=1&pageSize=50", { token, revalidate: false }),
  getProductsAdmin: (token: string) =>
    request<Paged<ProductDto>>("/api/products?page=1&pageSize=50", { token, revalidate: false }),
  getFaqsAdmin: (token: string) =>
    request<Paged<FaqDto>>("/api/faqs?page=1&pageSize=50", { token, revalidate: false }),
  getJobsAdmin: (token: string) =>
    request<Paged<JobDto>>("/api/careers?page=1&pageSize=50&openOnly=false", { token, revalidate: false }),
  getCaseStudiesAdmin: (token: string) =>
    request<Paged<CaseStudyDto>>("/api/case-studies?page=1&pageSize=50", { token, revalidate: false }),
  getTeamAdmin: (token: string) =>
    request<Paged<TeamDto>>("/api/team?page=1&pageSize=50", { token, revalidate: false }),
  updateEnquiryStatus: (token: string, id: string, status: string) =>
    request<EnquiryAdminDto>(`/api/enquiries/${id}/status`, {
      method: "PATCH",
      token,
      body: JSON.stringify({ status }),
    }),
};

export type PageDto = {
  id: string;
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  contentBlocksJson: string;
};

export type ArticleDto = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  category?: string;
  tags?: string;
  author?: string;
  readingTimeMinutes: number;
  publishedAt?: string;
};

export type ProductDto = {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  featuresJson?: string;
  workflowStepsJson?: string;
  isFlagship: boolean;
};

export type TourStepDto = {
  id: string;
  title: string;
  description?: string;
  stepOrder: number;
  imageUrl?: string;
};

export type IndustryDto = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type FaqDto = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type TeamDto = {
  id: string;
  fullName: string;
  title?: string;
  bio?: string;
  isLeadership: boolean;
};

export type CaseStudyDto = {
  id: string;
  title: string;
  slug: string;
  industry: string;
  challenge: string;
  approach: string;
  outcome: string;
  results?: string;
};

export type JobDto = {
  id: string;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  employmentType?: string;
  description: string;
};

export type ResourceDto = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
  isGated: boolean;
};

export type EnquiryPayload = {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  areaOfInterest: string;
  message: string;
  source?: string;
  pageUrl?: string;
};

export type EnquiryDto = {
  id: string;
  draftSessionId?: string;
};

export type EnquiryAdminDto = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  areaOfInterest: string;
  message?: string;
  status: string;
  source?: string;
  createdAt: string;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  email: string;
  fullName: string;
  role: string;
};

export type BookingPayload = {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  productInterest?: string;
  preferredStartUtc: string;
  timeZone?: string;
  notes?: string;
};

export type SearchItem = {
  type: string;
  title: string;
  slug: string;
  snippet?: string;
  score: number;
};

export type RecommendDto = {
  recommendedSlug: string;
  recommendedName: string;
  rationale: string;
  alternatives: string[];
};

export type RoiPayload = {
  calculatorType: string;
  parameters: Record<string, number>;
  email?: string;
  fullName?: string;
  captureLead?: boolean;
};

export type RoiDto = {
  calculatorType: string;
  results: Record<string, number | string>;
  leadCaptured: boolean;
};

export type ConsentPayload = {
  sessionId: string;
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};
