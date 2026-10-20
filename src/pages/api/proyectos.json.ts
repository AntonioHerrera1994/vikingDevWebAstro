// src/pages/api/proyectos.json.ts
import type { APIRoute } from 'astro';
import { projects } from '../../data/projects';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(projects), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};