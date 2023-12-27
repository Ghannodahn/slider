import { TestBed } from '@angular/core/testing';

import { SessionsService } from './sessions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Session } from './session';
import { NewId } from '../data/new-id';

describe('SessionsService', () => {
  let service: SessionsService;
  let httpController: HttpTestingController;

  const SESSION_NEW: Session = {sessionId: 0, startTime: new Date("2023-12-10 19:00:00"), endTime: new Date("2023-12-10 23:00:00"), currentPos: null};
  const SESSION_1: Session = {sessionId: 1, startTime: new Date("2023-12-01 19:00:00"), endTime: new Date("2023-12-01 23:00:00"), currentPos: null};
  const SESSION_2: Session = {sessionId: 2, startTime: new Date("2023-12-06 19:00:00"), endTime: new Date("2023-12-01 23:30:00"), currentPos: null};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(SessionsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should LIST sessions when empty', () => {
    var EXPECTED: Session[] = [];

    service.list().subscribe(sessions => {
      expect(sessions).toEqual(EXPECTED)
    });

    var req = httpController.expectOne('data/session/list');
    expect(req.request.method).toEqual('GET');
    req.flush(EXPECTED);

    httpController.verify();
  });

  it('should LIST sessions', () => {
    var EXPECTED: Session[] = [SESSION_1];

    service.list().subscribe(sessions => {
      expect(sessions).toEqual(EXPECTED);
    });

    var req = httpController.expectOne('data/session/list');
    expect(req.request.method).toEqual('GET');
    req.flush(EXPECTED);

    httpController.verify();
  });

  it('should GET a session', () => {
    var EXPECTED: Session = SESSION_1;
    var PROVIDED: number = 1;

    service.get(PROVIDED).subscribe(session => {
      expect(session.sessionId).toEqual(PROVIDED);
    });

    var req = httpController.expectOne('data/session/get?sessionId=' + PROVIDED);
    expect(req.request.method).toEqual('GET');
    req.flush(EXPECTED);

    httpController.verify();
  });

  it('should CREATE a session and return an ID', () => {
    var EXPECTED: NewId = {id: 1};
    var PROVIDED: Session = SESSION_NEW;

    service.create(PROVIDED).subscribe(newId => {
      expect(newId).toBe(EXPECTED);
    })

    var req = httpController.expectOne('data/session/create');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({params: PROVIDED});
    req.flush(EXPECTED);

    httpController.verify();
  });

  it('should UPDATE a session', () => {
    var EXPECTED: string = '';
    var PROVIDED: Session = SESSION_2;

    service.update(PROVIDED).subscribe(() => {
      // Add success messaging.
    });

    var req = httpController.expectOne('data/session/edit');
    expect(req.request.method).toEqual('PUT');
    console.log(PROVIDED);
    expect(req.request.body).toEqual({params: PROVIDED});
    req.flush(EXPECTED);

    httpController.verify;
  });
});
