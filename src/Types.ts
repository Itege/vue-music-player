export type Song = {
	album: string
	albumArtist: string
	artist: string
	cover: string
	filename: string
	songname: string
	tracknum: string
	idx?: number
};

export type Artist = {
	name: string,
	albums: Set<string>,
	covers: Set<string>,
	songs: number[],
};


export type Album = {
	name: string,
	cover: string,
	songs: number[],
};