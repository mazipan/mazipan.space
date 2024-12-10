import { getAllEntries } from '@/modules/common';
import { COLLECTIONS } from '@/constants/collections';

/*-------------------------------- getAllProjects ------------------------------*/

export const getAllProjects = () => getAllEntries(COLLECTIONS.PROJECT);
