"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Play, Eye, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { projects, getCategoryColor, Project } from "@/data/projects";
import { openWhatsApp } from "@/lib/whatsapp";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function ProjectCard({
  project,
  onOpenDetails,
}: {
  project: Project;
  onOpenDetails: (project: Project) => void;
}) {
  return (
    <motion.div variants={item}>
      <Card className="group h-full card-3d overflow-hidden border-2 border-transparent hover:border-primary/20">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-blue/20 to-primary-teal/20">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            {project.demoUrl && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => window.open(project.demoUrl!, "_blank")}
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                Testar Demo
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onOpenDetails(project)}
              className="gap-2 bg-white/10 border-white text-white hover:bg-white hover:text-black"
            >
              <Eye className="h-4 w-4" />
              Ver Detalhes
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Category Badge */}
          <Badge className={`mb-2 ${getCategoryColor(project.category)}`}>
            {project.category}
          </Badge>

          {/* Title */}
          <h3 className="font-poppins font-semibold text-lg mb-1">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-teal/10 text-primary-teal rounded-full font-medium">
              {project.metrics}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Badge className={getCategoryColor(project.category)}>
              {project.category}
            </Badge>
            <DialogTitle className="font-poppins text-2xl">
              {project.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Demo iframe or image */}
        <div className="relative aspect-video bg-gradient-to-br from-primary-blue/20 to-primary-teal/20 rounded-lg overflow-hidden mb-4">
          {project.demoType === "iframe" && project.demoUrl ? (
            <iframe
              src={project.demoUrl}
              className="w-full h-full"
              allow="clipboard-write"
              loading="lazy"
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4">{project.longDescription}</p>

        {/* Technologies */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Tecnologias utilizadas:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-4 p-4 bg-primary-teal/10 rounded-lg">
          <h4 className="font-semibold mb-1">Resultado:</h4>
          <p className="text-primary-teal font-medium text-lg">
            {project.metrics}
          </p>
        </div>

        {/* Testimonial */}
        {project.testimonial && (
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <Quote className="h-6 w-6 text-primary-teal mb-2" />
            <p className="italic text-muted-foreground">
              &ldquo;{project.testimonial}&rdquo;
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {project.demoUrl && (
            <Button
              onClick={() => window.open(project.demoUrl!, "_blank")}
              className="gradient-primary-135 text-white gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Abrir Demo
            </Button>
          )}
          {project.liveUrl && project.liveUrl !== project.demoUrl && (
            <Button
              variant="outline"
              onClick={() => window.open(project.liveUrl!, "_blank")}
              className="gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Ver ao Vivo
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={() =>
              openWhatsApp({ type: "project", projectName: project.title })
            }
            className="gap-2"
          >
            Quero Algo Similar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 200);
  };

  return (
    <section id="projetos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            VÊ SÓ O QUE EU JÁ FIZ{" "}
            <span className="text-gradient">(E VOCÊ PODE TESTAR AGORA)</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Clique para testar demos ao vivo ou ver detalhes dos projetos
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={handleOpenDetails}
            />
          ))}
        </motion.div>

        {/* Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}
