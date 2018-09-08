import { BaseResult } from './baseResult';
import { SimplePlaylist } from '../simplePlaylist';

export class AllUserPlaylistsResult extends BaseResult {
    public playlists: SimplePlaylist[];
}