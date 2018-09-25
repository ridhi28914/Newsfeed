import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import {
  MatMenuModule,
  MatTooltipModule,
  MatGridListModule,
  MatInputModule,
  MatCardModule,
  MatChipsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDatepicker,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSnackBarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { NewPostComponent } from './new-post/new-post.component';
import { TimelineComponent } from './timeline/timeline.component';
import { PostService } from './post.service';


@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatGridListModule,
    MatTooltipModule,
    MatRadioModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
