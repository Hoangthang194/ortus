"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, Upload, Save } from "lucide-react"

interface MenuImage {
  id: string
  src: string
  alt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [menuImages, setMenuImages] = useState<MenuImage[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem("admin_auth")
    if (auth === "true") {
      setIsAuthenticated(true)
      loadMenuImages()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "admin" && password === "admin@123") {
      setIsAuthenticated(true)
      localStorage.setItem("admin_auth", "true")
      setError("")
      loadMenuImages()
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin_auth")
    setUsername("")
    setPassword("")
  }

  const loadMenuImages = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/menu-images")
      if (response.ok) {
        const data = await response.json()
        setMenuImages(data.images || [])
      }
    } catch (error) {
      console.error("Error loading menu images:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log("=== ADMIN UPLOAD START ===")
    console.log("File selected:", {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified
    })

    // Validate file type
    if (!file.type.startsWith("image/")) {
      console.error("Invalid file type:", file.type)
      setError("Chỉ được upload file ảnh")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error("File too large:", file.size, "bytes")
      setError("Kích thước file không được vượt quá 5MB")
      return
    }

    try {
      setUploading(true)
      setError("")
      console.log("Starting upload process...")

      const formData = new FormData()
      formData.append("image", file)
      console.log("FormData created")

      console.log("Sending request to /api/upload-menu-image")
      const response = await fetch("/api/upload-menu-image", {
        method: "POST",
        body: formData,
      })

      console.log("Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Upload successful, received data:", data)
        setMenuImages(prev => [...prev, data.image])
        setError("")
        console.log("=== ADMIN UPLOAD SUCCESS ===")
      } else {
        const errorData = await response.json()
        console.error("Upload failed:", errorData)
        setError(errorData.error || "Lỗi khi upload ảnh")
        console.log("=== ADMIN UPLOAD FAILED ===")
      }
    } catch (error) {
      console.error("=== ADMIN UPLOAD ERROR ===")
      console.error("Error type:", error.constructor.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
      console.error("Full error object:", error)
      console.error("=== END ADMIN ERROR LOG ===")
      setError("Lỗi khi upload ảnh")
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async (id: string) => {
    try {
      const response = await fetch(`/api/menu-images/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setMenuImages(prev => prev.filter(img => img.id !== id))
        setError("")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Lỗi khi xóa ảnh")
      }
    } catch (error) {
      setError("Lỗi khi xóa ảnh")
    }
  }

  const handleSaveOrder = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/menu-images", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images: menuImages }),
      })

      if (response.ok) {
        setError("")
        alert("Đã lưu thứ tự ảnh thành công!")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Lỗi khi lưu thứ tự")
      }
    } catch (error) {
      setError("Lỗi khi lưu thứ tự")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Đăng nhập để quản lý menu
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Tên đăng nhập
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mật khẩu
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Menu</h1>
            <p className="text-gray-600">Upload và quản lý ảnh menu</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Đăng xuất
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload ảnh mới</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="flex-1"
              />
              {uploading && (
                <div className="text-sm text-gray-500">Đang upload...</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Danh sách ảnh menu ({menuImages.length})</CardTitle>
              <Button 
                onClick={handleSaveOrder} 
                disabled={loading}
                className="flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Lưu thứ tự</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Đang tải...</div>
            ) : menuImages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Chưa có ảnh nào. Hãy upload ảnh đầu tiên.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuImages.map((image, index) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      #{index + 1}
                    </div>
                    <Button
                      onClick={() => handleDeleteImage(image.id)}
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 truncate">{image.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
