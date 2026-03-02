"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  BrandGithub,
  BrandX,
  Envelope as MailIcon,
} from "@mynaui/icons-react";
import { Linkedin } from "lucide-react";

interface BasicsLocation {
  region: string;
  country: string;
}

interface BasicsProfile {
  network: string;
  username: string;
  url: string;
}

export interface Basics {
  name: string;
  label: string;
  email: string;
  image: string;
  location: BasicsLocation;
  profiles: BasicsProfile[];
}

export interface FlagImage {
  src: string;
  alt?: string;
}

export interface ProfileCardProps {
  basics: Basics;
  flags?: FlagImage[];  // aquí pasaremos AT.svg y VE.svg
}

function SocialIcon({ network }: { network: string }) {
  return (
    <span>
      {network === "LinkedIn" && <Linkedin className="size-5" strokeWidth={2.2} />}
      {network === "X" && <BrandX className="size-5" />}
      {network === "GitHub" && <BrandGithub className="size-5" />}
    </span>
  );
}

export function ProfileCard({ basics, flags = [] }: ProfileCardProps) {
  const { name, label, email, image, location, profiles } = basics;
  const locationText = [location.region, location.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="max-w-3xl mx-auto border border-border/60 bg-card/60 backdrop-blur w-full">
      <CardContent className="flex flex-col-reverse gap-6 p-4 sm:p-6 sm:flex-row sm:items-center">

        <div className="flex-1 space-y-4 w-full">

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="animate-location-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{locationText}</span>
            </span>

            <style>
              {`
              @keyframes location-pulse {
                0% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.3; transform: scale(0.9); }
                100% { opacity: 1; transform: scale(1); }
              }

              .animate-location-pulse {
                animation: location-pulse 1.2s ease-in-out infinite;
              }
            `}
            </style>

            {flags.length > 0 && (
              <span className="flex items-center gap-2 select-none">
                {flags.map((flag) => (
                  <span
                    key={flag.src}
                    className="inline-flex items-center justify-center rounded-md border border-border/60 bg-muted/40 p-1"
                  >
                    <img
                      src={flag.src}
                      alt={flag.alt ?? ""}
                      className="h-5 w-auto md:h-3.5"
                      loading="lazy"
                    />
                  </span>
                ))}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {email && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="gap-2 font-mono text-xs sm:text-sm"
              >
                <a href={`mailto:${email}`}>
                  <MailIcon size={16} />
                  <span>{email}</span>
                </a>
              </Button>
            )}

            {profiles.map((p) => (
                <Button
                  key={p.network}
                  variant="outline"
                  size="icon">
                  <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={p.network}
                >
                  <SocialIcon network={p.network} />
                </a>
                </Button>
            ))}
          </div>
        </div>

        <div className="shrink-0 flex justify-center sm:block">
          <div className="rounded-2xl border border-border/60 bg-linear-to-b from-background to-muted/40 p-1">
            <div className="aspect-3/4 w-28 sm:w-32 overflow-hidden rounded-2xl ">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
