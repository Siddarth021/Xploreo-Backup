import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TravelerModule } from './traveler/traveler.module';
import { GuideModule } from './guide/guide.module';
import { HotelsModule } from './hotels/hotels.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { SuperadminModule } from './superadmin/superadmin.module';
import { TechadminModule } from './techadmin/techadmin.module';
import { NontechadminModule } from './nontechadmin/nontechadmin.module';
import { PlansModule } from './plans/plans.module';
import { AuthModule } from './auth/auth.module';
import { TravellerModule } from './traveller/traveller.module';
import { GuideModule } from './guide/guide.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [AuthModule, TravelerModule, GuideModule, HotelsModule, ExperiencesModule, SuperadminModule, TechadminModule, NontechadminModule, PlansModule, TravellerModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
