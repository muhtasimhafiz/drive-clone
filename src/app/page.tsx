"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { ChevronRight, File, Folder, Plus, Search, Settings } from "lucide-react"

interface Item {
  id: string
  name: string
  type: "folder" | "file"
  children?: Item[]
}

const mockData: Item[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    children: [
      { id: "1-1", name: "Report.docx", type: "file" },
      { id: "1-2", name: "Presentation.pptx", type: "file" },
    ],
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    children: [
      { id: "2-1", name: "Vacation.jpg", type: "file" },
      { id: "2-2", name: "Family.png", type: "file" },
    ],
  },
  { id: "3", name: "Budget.xlsx", type: "file" },
  { id: "4", name: "Notes.txt", type: "file" },
]

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<Item[]>(mockData)
  const [breadcrumb, setBreadcrumb] = useState<Item[]>([{ id: "root", name: "My Drive", type: "folder" }])

  const openFolder = (folder: Item) => {
    if (folder.type === "folder" && folder.children) {
      setCurrentFolder(folder.children)
      setBreadcrumb([...breadcrumb, folder])
    }
  }

  const navigateToBreadcrumb = (index: number) => {
    const newBreadcrumb = breadcrumb.slice(0, index + 1)
    setBreadcrumb(newBreadcrumb)
    setCurrentFolder(index === 0 ? mockData : newBreadcrumb[newBreadcrumb.length - 1]?.children ?? [])
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Google Drive Clone</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="search"
            placeholder="Search in Drive"
            className="w-64 bg-gray-800 text-gray-100 border-gray-700"
          />
          <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <nav className="mb-4">
        <ol className="flex items-center space-x-2">
          {breadcrumb.map((item, index) => (
            <li key={item.id} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />}
              <Button
                variant="link"
                className="text-blue-400 hover:text-blue-300"
                onClick={() => navigateToBreadcrumb(index)}
              >
                {item.name}
              </Button>
            </li>
          ))}
        </ol>
      </nav>

      <main>
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Files and Folders</h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="px-4 py-2 bg-gray-700 text-gray-300 flex">
            <span className="w-8"></span>
            <span className="flex-1">Name</span>
            <span className="w-32 text-right">Type</span>
          </div>
          <ul>
            {currentFolder.map((item) => (
              <li
                key={item.id}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
                onClick={() => item.type === "folder" && openFolder(item)}
              >
                {item.type === "folder" ? (
                  <Folder className="mr-2 h-5 w-5 text-yellow-400" />
                ) : (
                  <File className="mr-2 h-5 w-5 text-gray-400" />
                )}
                <span className="flex-1">
                  {item.type === "file" ? (
                    <Link href={`#file-${item.id}`} className="text-blue-400 hover:underline">
                      {item.name}
                    </Link>
                  ) : (
                    item.name
                  )}
                </span>
                <span className="w-32 text-right text-gray-400">
                  {item.type === "folder" ? "Folder" : item.name.split(".").pop()?.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

