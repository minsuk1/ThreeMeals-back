import { Repository, EntityRepository } from 'typeorm';
import { Service } from 'typedi';
import { Notification } from '../entities/Notification';
import { Account } from '../entities/Account';
import { BaseRepository } from './BaseRepository';

@Service()
@EntityRepository(Notification)
export class NotificationRepository extends BaseRepository<Notification> {
    async saveNotification(noti: Notification): Promise<Notification> {
        return this.entityManager.save(noti);
    }

    async getNotifications(account: Account) {
        const notifications = await this.find({ accountId: account.id });
        return notifications;
    }
}
