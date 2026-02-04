/** Phase 3: 本番プロダクト用テーブル型（Supabase schema に合わせる） */
export type TicketStatus =
  | "received"
  | "vendor_contacted"
  | "scheduled"
  | "completed";
export type TicketPriority = "normal" | "urgent";

export interface Property {
  id: string;
  name: string;
  address: string | null;
  twilio_phone_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface Resident {
  id: string;
  property_id: string | null;
  name: string;
  phone: string | null;
  email: string | null;
  created_at: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  created_at: string;
}

export interface Ticket {
  id: string;
  property_id: string | null;
  resident_id: string | null;
  subject: string | null;
  status: TicketStatus;
  priority: TicketPriority;
  vendor_id: string | null;
  scheduled_at: string | null;
  recording_url: string | null;
  summary: string | null;
  created_at: string;
  updated_at: string;
}
