"use client"

import * as React from "react"
import Image from "next/image"
import { getMediaUrl } from "@/lib/api"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function TeamCarousel({ team, lang = 'fr' }: { team: any[], lang?: string }) {
  if (!team || team.length === 0) return null;

  const getField = (obj: any, field: string) => {
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  return (
    <div className="px-12 w-full max-w-5xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {team.map((m: any) => (
            <CarouselItem key={m.id || m.name} className="pl-4 md:basis-1/2 lg:basis-1/4">
              <div className="text-center group p-4 border border-transparent hover:border-border hover:bg-white rounded-xl transition-all duration-300">
                <div className="relative w-32 h-32 rounded-full bg-[#002D62] text-white overflow-hidden flex items-center justify-center mx-auto mb-5 border-4 border-[#002D62]/10 shadow-lg group-hover:scale-105 transition-transform duration-500">
                  {m.image ? (
                    <Image 
                      src={getMediaUrl(m.image)} 
                      alt={m.name} 
                      fill 
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    />
                  ) : (
                    <span className="font-serif text-4xl font-bold">{m.initials}</span>
                  )}
                </div>
                <p className="font-serif font-bold text-[#002D62] text-base">{m.name}</p>
                <p className="text-[#D32F2F] text-xs font-bold uppercase tracking-widest mt-1.5">{getField(m, 'role')}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-6 w-12 h-12 border-2" />
        <CarouselNext className="-right-6 w-12 h-12 border-2" />
      </Carousel>
    </div>
  )
}
