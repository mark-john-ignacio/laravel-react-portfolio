import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@inertiajs/react';
import { ArrowRight, Download, ExternalLink, Github, MapPin, Mail, Phone, Calendar, Building } from 'lucide-react';

interface AboutInfo {
    key: string;
    title: string;
    content: string;
    metadata: {
        name: string;
        title: string;
        location: string;
        email: string;
        phone: string;
        linkedin: string;
        github: string;
    };
}

interface Skill {
    id: number;
    name: string;
    category: string;
    proficiency_level: number;
    years_experience: number;
    icon_name: string;
    color: string;
    is_featured: boolean;
}

interface Experience {
    id: number;
    title: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
    technologies: string[];
    employment_type: string;
}

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    image_url: string | null;
    demo_url: string | null;
    github_url: string | null;
    technologies: string[];
    status: string;
}

interface Props {
    aboutInfo: AboutInfo | null;
    featuredSkills: Skill[];
    featuredExperiences: Experience[];
    featuredProjects: Project[];
}

export default function Home({ aboutInfo, featuredSkills, featuredExperiences, featuredProjects }: Props) {
    return (
        <PortfolioLayout>
            <Head title="Home - Mark John Ignacio" />

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                                    Hi, I'm{' '}
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {aboutInfo?.metadata.name || 'Mark John Ignacio'}
                                    </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-muted-foreground mt-4">
                                    {aboutInfo?.metadata.title || 'Laravel Developer'}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{aboutInfo?.metadata.location || 'Philippines'}</span>
                                </div>
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {aboutInfo?.content || 'Passionate developer building modern web applications.'}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button asChild>
                                    <Link href="/contact">
                                        Get In Touch
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <a href="/resume.pdf" download>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Resume
                                    </a>
                                </Button>
                            </div>

                            {/* Contact Info */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                {aboutInfo?.metadata.email && (
                                    <a
                                        href={`mailto:${aboutInfo.metadata.email}`}
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        <Mail className="h-4 w-4" />
                                        {aboutInfo.metadata.email}
                                    </a>
                                )}
                                {aboutInfo?.metadata.phone && (
                                    <a
                                        href={`tel:${aboutInfo.metadata.phone}`}
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        <Phone className="h-4 w-4" />
                                        {aboutInfo.metadata.phone}
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Avatar className="h-64 w-64 md:h-80 md:w-80 border-4 border-background shadow-xl">
                                <AvatarImage src="/images/profile.jpg" alt="Mark John Ignacio" />
                                <AvatarFallback className="text-6xl">MJ</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Skills */}
            {featuredSkills.length > 0 && (
                <section className="py-16 px-4 bg-background/50">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Technologies</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Technologies and tools I work with to build modern, scalable applications.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {featuredSkills.map((skill) => (
                                <Card key={skill.id} className="text-center hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <div
                                            className="w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold"
                                            style={{ backgroundColor: skill.color }}
                                        >
                                            {skill.name.charAt(0)}
                                        </div>
                                        <h3 className="font-semibold">{skill.name}</h3>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {skill.years_experience}+ years
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Experience */}
            {featuredExperiences.length > 0 && (
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Experience</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                A glimpse into my professional journey and the roles that shaped my expertise.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {featuredExperiences.map((experience, index) => (
                                <Card key={experience.id} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="p-8">
                                        <div className="grid md:grid-cols-4 gap-6">
                                            <div className="md:col-span-1 space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>
                                                        {new Date(experience.start_date).getFullYear()} -{' '}
                                                        {experience.is_current
                                                            ? 'Present'
                                                            : new Date(experience.end_date!).getFullYear()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Building className="h-4 w-4" />
                                                    <span>{experience.employment_type}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="md:col-span-3 space-y-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold">{experience.title}</h3>
                                                    <p className="text-lg text-muted-foreground">
                                                        {experience.company} • {experience.location}
                                                    </p>
                                                </div>
                                                
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {experience.description}
                                                </p>
                                                
                                                <div className="flex flex-wrap gap-2">
                                                    {experience.technologies.map((tech) => (
                                                        <Badge key={tech} variant="secondary">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <Button asChild variant="outline">
                                <Link href="/experience">
                                    View All Experience
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <section className="py-16 px-4 bg-background/50">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Some of the projects I've built that showcase my skills and passion for development.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredProjects.map((project) => (
                                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                                            {project.title.charAt(0)}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <CardTitle className="text-xl">{project.title}</CardTitle>
                                            <CardDescription className="mt-2">
                                                {project.description}
                                            </CardDescription>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.slice(0, 3).map((tech) => (
                                                <Badge key={tech} variant="outline">
                                                    {tech}
                                                </Badge>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <Badge variant="outline">+{project.technologies.length - 3} more</Badge>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            {project.demo_url && (
                                                <Button size="sm" asChild>
                                                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="mr-2 h-4 w-4" />
                                                        Demo
                                                    </a>
                                                </Button>
                                            )}
                                            {project.github_url && (
                                                <Button size="sm" variant="outline" asChild>
                                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                                        <Github className="mr-2 h-4 w-4" />
                                                        Code
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <Button asChild variant="outline">
                                <Link href="/projects">
                                    View All Projects
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        I'm always interested in new opportunities and exciting projects. 
                        Let's discuss how we can bring your ideas to life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/contact">
                                Start a Conversation
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/projects">
                                View My Work
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </PortfolioLayout>
    );
}
