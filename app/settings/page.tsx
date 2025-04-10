"use client"
import { redirect } from "next/navigation"

export default function SettingsPage() {
  // Redirect to account settings page
  redirect("/settings/account")
}

