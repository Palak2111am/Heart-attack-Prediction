"use client"

import { useState } from "react"
import {
  Heart,
  Shield,
  FileText,
  Menu,
  Home,
  Activity,
  Calculator,
  MessageSquare,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "lifebeat", label: "Lifebeat App", icon: Heart },
    { id: "prediction", label: "Heart Prediction", icon: Activity },
    { id: "calculator", label: "Health Calculator", icon: Calculator },
    { id: "precautions", label: "Precautions", icon: Shield },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "privacy", label: "Privacy Policy", icon: FileText },
  ]

  const handleNavigation = (pageId: string) => {
    onPageChange(pageId)
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-red-500 animate-pulse" />
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Lifebeat
              </span>
            </div>

            {/* Menu Items */}
            <div className="flex items-center space-x-1">
              {menuItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Button
                    key={item.id}
                    className={`flex items-center gap-2 ${
                      currentPage === item.id
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "text-white"
                    }`}
                    onClick={() => handleNavigation(item.id)}
                  >
                    <IconComponent className="h-4 w-4" />
                    {item.label}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500 animate-pulse" />
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Lifebeat
              </span>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon
                    return (
                      <Button
                        key={item.id}
                        className={`flex items-center gap-3 justify-start h-12 ${
                          currentPage === item.id
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "text-white"
                        }`}
                        onClick={() => handleNavigation(item.id)}
                      >
                        <IconComponent className="h-5 w-5" />
                        {item.label}
                      </Button>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  )
}
