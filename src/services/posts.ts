import { flatten, orderBy, uniq, uniqBy } from 'lodash';
import { Post } from '../utils/types';
import util from 'util';
import axios from 'axios';
import getCache from '../utils/cache';

const API_URL = 'https://api.hatchways.io/assessment/blog/posts?tag=%s';
const ONE_HOUR_IN_SECONDS = 3600;

/**
 * @param {string} tagsAsString
 * @param {string} sortBy
 * @param {string} direction
 * @returns {Promise<{posts: Array<Object>}>}
 */
export async function getPostsService(
  tagsAsString: string,
  sortBy: string,
  direction: any,
): Promise<{ posts: Post[] }> {
  const tags = uniq(tagsAsString.split(',').map(tag => tag.trim()));
  const posts = await _aggregatePosts(tags);
  const uniquePosts = uniqBy(posts, 'id');

  return { posts: orderBy(uniquePosts, sortBy, direction) };
}

/**
 * @param {Array<string>} tags
 * @returns {Promise<{Array<Object>}>}
 */
async function _aggregatePosts(tags: string[]): Promise<Post[]> {
  const promises = tags.map(tag => getBlogPosts(tag, { useCache: true }));
  const posts = await Promise.all(promises);

  return flatten(posts);
}

/**
 * @param {string} tag
 * @param {{ useCache: boolean }} [options]
 * @returns {Promise<Array<Object>>}
 */
export async function getBlogPosts(tag: string, options: any = {}): Promise<Post[]> {
  const { useCache } = options;

  if (useCache) {
    return _getBlogPostsFromCache(tag);
  }

  const { data } = await axios.get(util.format(API_URL, tag));

  const { posts } = data;
  _addBlogPostsToCache(tag, posts);

  return posts;
}

/**
 * @param {string} tag
 * @return {Array<Object>}
 */
function _getBlogPostsFromCache(tag: string) {
  const posts = getCache().get(tag);

  if (posts) {
    return posts;
  }

  return getBlogPosts(tag, { useCache: false });
}

/**
 * @param {string} tag
 * @param {Array<Object>} posts
 */
function _addBlogPostsToCache(tag: string, posts: Post[]) {
  return getCache().set(tag, posts, ONE_HOUR_IN_SECONDS);
}
