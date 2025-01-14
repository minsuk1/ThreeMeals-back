import { DBContext } from './DBContext';
import { config } from '../config';
import BaseError from '../exceptions/BaseError';
import { ERROR_CODE } from '../exceptions/ErrorCode';
import { IUnitOfWork, UNIT_OF_WORK } from '../common/IUnitOfWork';
import { IEventPublisher } from '../EventPublisher';
import { Service } from 'typedi';

@Service(UNIT_OF_WORK)
export class UnitOfWork implements IUnitOfWork {
    constructor(
        private readonly eventPublisher: IEventPublisher,
    ) {}

    get dbContext(): DBContext | undefined {
        return DBContext.currentDBContext();
    }

    async withTransaction<T>(work: () => T, name = config.db.default.connectionName): Promise<T> {
        const queryRunner = this.dbContext?.queryRunner;
        if (!queryRunner) {
            console.log('Cannot get query Runner');
            throw new BaseError(ERROR_CODE.INTERNAL_SERVER_ERROR);
        }
        await queryRunner.startTransaction();
        try {
            const result = await work();

            await this.eventPublisher.dispatchEventsAsync();

            await queryRunner.commitTransaction();
            return result;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
