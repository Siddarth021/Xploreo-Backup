import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TravellerModule } from './traveller/traveller.module';
import { GuideModule } from './guide/guide.module';
import { HotelsModule } from './hotels/hotels.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { SuperadminModule } from './superadmin/superadmin.module';
import { TechadminModule } from './techadmin/techadmin.module';
import { NontechadminModule } from './nontechadmin/nontechadmin.module';
import { PlansModule } from './plans/plans.module';
import { TripsModule } from './trips/trips.module';
import { LocationModule } from './location/location.module';
import { CitiesModule } from './cities/cities.module';
import { Auth } from './auth/entities/auth.entity';
import { Hotel } from './hotels/entities/hotel.entity';
import { Experience } from './experiences/entities/experience.entity';
import { Plan } from './plans/entities/plan.entity';
import { Trip } from './trips/entities/trip.entity';
import { DatabaseSeederService } from './database/database-seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH ?? 'data/xploreo.sqlite',
      entities: [Auth, Hotel, Experience, Plan, Trip],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Auth, Hotel, Experience, Plan, Trip]),
    AuthModule,
    TravellerModule,
    GuideModule,
    HotelsModule,
    ExperiencesModule,
    SuperadminModule,
    TechadminModule,
    NontechadminModule,
    PlansModule,
    TripsModule,
    LocationModule,
    CitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseSeederService],
})
export class AppModule {}
