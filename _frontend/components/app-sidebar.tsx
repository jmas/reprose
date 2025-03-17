import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ChevronsUpDown,
  FileJson,
  FileText,
  Folder,
  FolderPen,
  FolderUp,
  Github,
  MoreHorizontal,
  Pencil,
  Plus,
  PlusIcon,
  Trash,
} from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Github /> Github{" "}
                  <span className="text-gray-400">jmas/create</span>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuCheckboxItem>
                  Local Storage
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Github <span className="text-gray-400">jmas/create</span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Google Drive{" "}
                  <span className="text-gray-400">jmas.ukraine@gmail.com</span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusIcon />
                  Add source
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Files</SidebarGroupLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarGroupAction title="Add folder or file">
                <Plus /> <span className="sr-only">Add folder or file</span>
              </SidebarGroupAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Folder /> Add Folder
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText /> Add File
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SidebarGroupContent>
            <SidebarMenuButton className="relative">
              <FolderUp size="1rem" />
              <a href="#">_posts</a>
            </SidebarMenuButton>
            <SidebarMenuButton className="relative">
              <Folder size="1rem" />
              <a href="#">archive</a>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction>
                    <MoreHorizontal />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                  <DropdownMenuItem>
                    <FolderPen />
                    Rename or Move
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuButton>
            <SidebarMenuButton className="relative">
              <FileText size="1rem" />
              <a href="#">post1.md</a>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction>
                    <MoreHorizontal />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                  <DropdownMenuItem>
                    <Pencil />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FolderPen />
                    Rename or Move
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuButton>
            <SidebarMenuButton className="relative bg-gray-100">
              <FileText size="1rem" />
              <a href="#">post2.md</a>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction>
                    <MoreHorizontal />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                  <DropdownMenuItem>
                    <Pencil />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FolderPen />
                    Rename or Move
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuButton>
            <SidebarMenuButton className="relative">
              <FileText size="1rem" />
              <a href="#">post3.md</a>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction>
                    <MoreHorizontal />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                  <DropdownMenuItem>
                    <Pencil />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FolderPen />
                    Rename or Move
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuButton>
            <SidebarMenuButton className="relative">
              <FileJson size="1rem" />
              <a href="#">.reproserc.json</a>{" "}
              <span className="text-gray-400">Settings</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction>
                    <MoreHorizontal />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                  <DropdownMenuItem>Add settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
