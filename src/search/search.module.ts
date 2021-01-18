import { ClientOptions } from '@elastic/elasticsearch';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const clientOptions : ClientOptions = {
          node: configService.get('ELASTICSEARCH_NODE'),
          auth: {
            username: configService.get('ELASTICSEARCH_USERNAME')!,
            password: configService.get('ELASTICSEARCH_PASSWORD')!,
          }
        }
        return clientOptions;
      },
      inject: [ConfigService],
    }),
  ],
  exports: [ElasticsearchModule]
})
export class SearchModule {}
