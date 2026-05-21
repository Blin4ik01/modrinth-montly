import projectsMods from './blacklist/projects-mods.json'
import projectsResourcepacks from './blacklist/projects-resourcepacks.json'
import projectsDatapacks from './blacklist/projects-datapacks.json'
import projectsModpacks from './blacklist/projects-modpacks.json'
import organizations from './blacklist/organizations.json'
import urlPatterns from './blacklist/url-patterns.json'
import words from './blacklist/words.json'
import avatarPatterns from './blacklist/avatar-patterns.json'
import users from './blacklist/users.json'
import { normalizeProjectSlug } from './projectSlug'

class BlacklistCategory {
	constructor(name, items) {
		this.name = name
		this.items = new Set(items)
	}

	has(item) {
		if (!item) return false
		return this.items.has(item)
	}

	getAll() {
		return Array.from(this.items)
	}

	size() {
		return this.items.size
	}
}

class BlacklistManager {
	constructor() {
		this.projects = new Map([
			['mods', new BlacklistCategory('mods', projectsMods)],
			['resourcepacks', new BlacklistCategory('resourcepacks', projectsResourcepacks)],
			['datapacks', new BlacklistCategory('datapacks', projectsDatapacks)],
			['modpacks', new BlacklistCategory('modpacks', projectsModpacks)],
		])
		
		this.organizations = new BlacklistCategory('organizations', organizations)
		this.urlPatterns = new BlacklistCategory('urlPatterns', urlPatterns)
		this.words = new BlacklistCategory('words', words)
		this.avatarPatterns = new BlacklistCategory('avatarPatterns', avatarPatterns)
		this.users = new BlacklistCategory('users', users)
	}

	isProjectBlocked(slug) {
		if (!slug) return false
		const normalized = normalizeProjectSlug(slug)
		for (const [_, category] of this.projects) {
			if (category.has(normalized) || category.has(slug)) return true
		}
		return false
	}

	isOrganizationBlocked(organization) {
		return this.organizations.has(organization)
	}

	isUserBlocked(userId) {
		return this.users.has(userId)
	}

	isUrlBlocked(url) {
		if (!url) return false
		const patterns = this.urlPatterns.getAll()
		return patterns.some(pattern => url.includes(pattern))
	}

	isAvatarBlocked(url) {
		if (!url) return false
		const patterns = this.avatarPatterns.getAll()
		return patterns.some(pattern => url.includes(pattern))
	}

	replaceBlockedWords(text) {
		if (!text) return text
		let result = text
		this.words.getAll().forEach(word => {
			const regex = new RegExp(word, 'gi')
			result = result.replace(regex, '✨')
		})
		return result
	}

	getAllProjects() {
		const all = []
		for (const [_, category] of this.projects) {
			all.push(...category.getAll())
		}
		return all
	}
}

export const blacklistManager = new BlacklistManager()

export function isProjectBlocked(slug) {
	return blacklistManager.isProjectBlocked(slug)
}

export function isOrganizationBlocked(organization) {
	return blacklistManager.isOrganizationBlocked(organization)
}

export function isUserBlocked(userId) {
	return blacklistManager.isUserBlocked(userId)
}

export function isUrlBlocked(url) {
	return blacklistManager.isUrlBlocked(url)
}

export function replaceBlockedWords(text) {
	return blacklistManager.replaceBlockedWords(text)
}

export function isAvatarBlocked(url) {
	return blacklistManager.isAvatarBlocked(url)
}

export const BLACKLIST_PROJECTS = blacklistManager.getAllProjects()
export const BLACKLIST_ORGANIZATIONS = blacklistManager.organizations.getAll()
export const BLACKLIST_PATTERNS = blacklistManager.urlPatterns.getAll()
export const BLACKLIST_WORDS = blacklistManager.words.getAll()
export const BLACKLIST_AVATARS = blacklistManager.avatarPatterns.getAll()

