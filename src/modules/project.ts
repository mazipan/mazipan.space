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
