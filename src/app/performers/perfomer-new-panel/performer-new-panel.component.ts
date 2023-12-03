import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SessionManagerStateService } from '../../session-manager/session-manager-state.service';
import { PerformersService } from '../performers.service';

@Component({
  selector: 'slider-performer-new-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './performer-new-panel.component.html',
  styleUrl: './performer-new-panel.component.css'
})
export class PerformerNewPanelComponent {
  constructor(
    private stateService: SessionManagerStateService
  ) {}
  @Input()
  set sessionId(value: number) {
    this.stateService.dirtyPerformer.sessionId = value; }
  get sessionId(): number {
    return this.stateService.dirtyPerformer.sessionId; } 
  @Output() sessionIdChange = new EventEmitter<number>();

  @Input()
  set displayName(value: string) {
    this.stateService.dirtyPerformer.displayName = value; }
  get displayName(): string {
    return this.stateService.dirtyPerformer.displayName; } 
  @Output() displayNameChange = new EventEmitter<string>();

  @Input()
  set sessionPos(value: number) {
    this.stateService.dirtyPerformer.sessionPos = value; }
  get sessionPos(): number {
    return this.stateService.dirtyPerformer.sessionPos; } 
  @Output() sessionPosChange = new EventEmitter<number>();

  @Input()
  set link(value: string) {
    this.stateService.dirtyPerformer.link = value; }
  get link(): string {
    return this.stateService.dirtyPerformer.link; } 
  @Output() linkChange = new EventEmitter<string>();

  @Input()
  set socialIg(value: string) {
    this.stateService.dirtyPerformer.socialIg = value; }
  get socialIg(): string {
    return this.stateService.dirtyPerformer.socialIg; } 
  @Output() socialIgChange = new EventEmitter<string>();

  @Output() submit = new EventEmitter();

  onClickSubmit() {
    this.submit.emit();
  }
}
