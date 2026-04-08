import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
        <SidebarTrigger/>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        </div>
    );
}
