import { getCollection } from 'astro:content';

import { isPreviewMode } from '@/utils/preview';

import type { CollectionEntry, CollectionKey } from 'astro:content';

/*-------------------------------- all entries ------------------------------*/

export interface GetAllEntriesOptions {
  skipSort?: boolean;
  includeDrafts?: boolean;
}

/**
 * Sorts by publishDate desc by default. Newest on top.
 * Omits drafts by default - set by PREVIEW_MODE env var.
 *
 * ONLY place to filter draft posts and projects.
 */
export const getAllEntries = async <T extends CollectionKey>(
  collectionName: T,
  options?: GetAllEntriesOptions
): Promise<CollectionEntry<T>[]> => {
  const { skipSort = false, includeDrafts = isPreviewMode() } = options ?? {};

  const entries = await getCollection<T>(collectionName, ({ data }) => {
    const isProdAndDraft = import.meta.env.PROD && data.draft;
    return !isProdAndDraft || includeDrafts;
  });

  if (skipSort) return entries;

  const sortedEntries = sortEntriesByDateDesc(entries);
  return sortedEntries;
};

/*-------------------------- sort by updatedDate or publishDate ------------------------*/

// just for sorting
export const getEntryLastDate = <T extends CollectionKey>(entry: CollectionEntry<T>): Date =>
  entry.data.updatedDate ?? entry.data.publishDate;

export const sortEntriesByDateDesc = <T extends CollectionKey>(entries: CollectionEntry<T>[]) =>
  entries.slice().sort((a, b) => getEntryLastDate(b).valueOf() - getEntryLastDate(a).valueOf());

/*------------------------- lastAccessDate for components -----------------------*/

export interface EntryDates {
  publishDate: Date;
  updatedDate?: Date;
}
export interface EntryDatesResult {
  lastAccessDate: Date;
  isUpdatedDate: boolean;
}

export const getPublishedOrUpdatedDate = ({
  publishDate,
  updatedDate,
}: EntryDates): EntryDatesResult => {
  const result = {
    lastAccessDate: updatedDate ?? publishDate,
    isUpdatedDate: Boolean(updatedDate),
  };

  return result;
};
