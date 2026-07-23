// ============================================================
// Oromiel Makeup — Database Types
// Generated from supabase/migrations/20250101000000_initial_schema.sql
// Keep in sync with the SQL schema.
// ============================================================

// ---- Enums ----

export type ProductStatus = "nuevo" | "oferta" | "agotado" | "activo";

// ---- Row types (match SELECT * from each table) ----

export type Category = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  ingredients: string | null;
  brand: string | null;
  price: number;
  compare_at_price: number | null;
  stock: number;
  category_id: string | null;
  status: ProductStatus;
  is_featured: boolean;
  is_bestseller: boolean;
  views: number;
  whatsapp_clicks: number;
  created_at: string;
  updated_at: string;
  // joined relations (when using Supabase embed syntax)
  category?: Category | null;
  product_images?: ProductImage[];
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  sort_order: number;
};

export type Promotion = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  banner_url: string | null;
  discount_label: string | null;
  starts_at: string | null;
  ends_at: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type Testimonial = {
  id: string;
  author: string;
  role: string | null;
  content: string;
  avatar_url: string | null;
  rating: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type Settings = {
  id: number;
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  address: string | null;
  hours: string | null;
  logo_url: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_image_url: string | null;
  map_embed: string | null;
  primary_color: string | null;
};

export type ActivityLog = {
  id: string;
  user_id: string | null;
  action: string;
  entity: string | null;
  detail: string | null;
  created_at: string;
};

// ---- Insert types (omit auto-generated columns) ----

export type CategoryInsert = Omit<Category, "id" | "created_at">;

export type ProductInsert = Omit<Product, "id" | "created_at" | "updated_at" | "views" | "whatsapp_clicks" | "category" | "product_images">;

export type ProductImageInsert = Omit<ProductImage, "id">;

export type PromotionInsert = Omit<Promotion, "id" | "created_at">;

export type TestimonialInsert = Omit<Testimonial, "id" | "created_at">;

export type SettingsInsert = Omit<Settings, "id">;

export type ActivityLogInsert = Omit<ActivityLog, "id" | "created_at">;

// ---- Update types (all fields optional except id) ----

export type CategoryUpdate = Partial<Omit<Category, "id" | "created_at">>;

export type ProductUpdate = Partial<Omit<Product, "id" | "created_at" | "updated_at" | "category" | "product_images">>;

export type ProductImageUpdate = Partial<Omit<ProductImage, "id" | "product_id">>;

export type PromotionUpdate = Partial<Omit<Promotion, "id" | "created_at">>;

export type TestimonialUpdate = Partial<Omit<Testimonial, "id" | "created_at">>;

export type SettingsUpdate = Partial<Omit<Settings, "id">>;

// ---- Supabase Database type (for typed client) ----

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: CategoryInsert;
        Update: CategoryUpdate;
      };
      products: {
        Row: Product;
        Insert: ProductInsert;
        Update: ProductUpdate;
      };
      product_images: {
        Row: ProductImage;
        Insert: ProductImageInsert;
        Update: ProductImageUpdate;
      };
      promotions: {
        Row: Promotion;
        Insert: PromotionInsert;
        Update: PromotionUpdate;
      };
      testimonials: {
        Row: Testimonial;
        Insert: TestimonialInsert;
        Update: TestimonialUpdate;
      };
      settings: {
        Row: Settings;
        Insert: SettingsInsert;
        Update: SettingsUpdate;
      };
      activity_log: {
        Row: ActivityLog;
        Insert: ActivityLogInsert;
        Update: Partial<Omit<ActivityLog, "id" | "created_at">>;
      };
    };
    Functions: {
      increment_product_metric: {
        Args: { p_id: string; p_column: string };
        Returns: void;
      };
    };
  };
};
