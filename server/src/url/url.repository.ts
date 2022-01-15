import { CreateUrlDto } from './dto/create-url.dto';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { InternalServerErrorException } from '@nestjs/common';

export class UrlRepository {
  constructor(private readonly persistentStorageClient: DynamoDBDocumentClient) {
    const dynamoDBClient = new DynamoDBClient({});
    this.persistentStorageClient = DynamoDBDocumentClient.from(dynamoDBClient);
  }
  // TODO: according to this discussion looks like command without sortKey are not supported - https://stackoverflow.com/questions/49907479/dynamo-db-delete-all-partition-key-entries-regardless-of-sort-key-values
  // what we need to do is make alias the only PK and index the userId, visitsCount

  async updateUrl(createUrlDto: CreateUrlDto) {
    try {
      await this.persistentStorageClient.send(
        new PutCommand({
          TableName: 'urls',
          Item: {
            userId: 'someone', //TODO: replace this value with one from jwt
            alias: createUrlDto.alias ?? 'something',
            longUrl: createUrlDto.longUrl,
            visitsCount: 0,
            creationDate: new Date().toISOString(),
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUrl(alias: string) {
    try {
      await this.persistentStorageClient.send(
        new DeleteCommand({
          TableName: 'urls',
          Key: {
            // TODO: fix deleting to work based on only the alias without the sort key
            visitsCount: 0,
            alias: alias
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getUrl(alias: string) {
    try {
      const res = await this.persistentStorageClient.send(
        new GetCommand({
          TableName: 'urls',
          Key: {
            alias: alias,
            // TODO: fix deleting to work based on only the alias without the sort key
            visitsCount: 0,
          }
        })
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}