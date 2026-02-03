import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, state, socialLinks, bio } = body;

    // Validate required fields
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !state?.trim() || !bio?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      // If Supabase not configured, just return success (for testing)
      console.log("Application received (Supabase not configured):", {
        firstName,
        lastName,
        email,
        state,
      });
      return NextResponse.json({ success: true, message: "Application received" });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if email already has a pending or approved application
    const { data: existing } = await supabase
      .from("applications")
      .select("id, status")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      if (existing.status === "pending") {
        return NextResponse.json(
          { error: "An application with this email is already pending review" },
          { status: 400 }
        );
      }
      if (existing.status === "approved") {
        return NextResponse.json(
          { error: "This email has already been approved. Please sign in." },
          { status: 400 }
        );
      }
    }

    // Insert application
    const { data: application, error } = await supabase
      .from("applications")
      .insert({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.toLowerCase().trim(),
        state: state.trim(),
        social_links: socialLinks?.trim() || null,
        bio: bio.trim(),
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to submit application" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId: application.id,
    });
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

// GET - List applications (admin only, will add auth later)
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ applications: [] });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: applications, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch applications" },
        { status: 500 }
      );
    }

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
