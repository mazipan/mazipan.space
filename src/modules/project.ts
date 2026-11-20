import { getAllEntries, idToSlug } from '@/modules/common';
import { COLLECTIONS } from '@/constants/collections';

import type { Project } from '@/types/project';

/*-------------------------------- getAllProjects ------------------------------*/
/**
 * From this point Project[] instead of CollectionEntry<'project'>[].
 * My custom type with slug, etc.
 */
export const getAllProjects = (): Promise<Project[]> =>
  getAllEntries(COLLECTIONS.PROJECT).then((entries) => entries.map(idToSlug));

/**
 * "Selected projects" for the home page: the ones marked `featured: true`, newest first. If none is
 * marked, the newest ones. `projects` must be sorted newest first (getAllProjects does that).
 */
export const getSelectedProjects = (projects: Project[], count = 3): Project[] => {
  const featured = projects.filter((project) => project.data.featured);
  return (featured.length > 0 ? featured : projects).slice(0, count);
};
