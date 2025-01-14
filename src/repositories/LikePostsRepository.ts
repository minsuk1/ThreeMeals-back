import { EntityRepository } from 'typeorm';
import { LikePost } from '../entities/LikePost';
import { Service } from 'typedi';
import { BaseRepository } from './BaseRepository';
import { Post } from '../entities/Post';


@Service()
@EntityRepository(LikePost)
export class LikePostsRepository extends BaseRepository<LikePost> {
    async saveLike(likePost: LikePost): Promise<LikePost> {
        return this.entityManager.save(likePost);
    }

    async deleteLikes(post: Post): Promise<void> {
        await this.entityManager.delete(LikePost, {
            post: post,
        });
    }
}
