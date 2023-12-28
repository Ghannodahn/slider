import { TestBed } from '@angular/core/testing';

import { SessionsService } from './sessions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Session } from './session';
import { NewId } from '../data/new-id';
import { TestData } from '../testing/test-data';

describe('SessionsService', () => {
  let service: SessionsService;
  let httpController: HttpTestingController;

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
    var EXPECTED: Session[] = [TestData.Sessions[1]];

    service.list().subscribe(sessions => {
      expect(sessions).toEqual(EXPECTED);
    });

    var req = httpController.expectOne('data/session/list');
    expect(req.request.method).toEqual('GET');
    req.flush(EXPECTED);

    httpController.verify();
  });

  it('should GET a session', () => {
    var EXPECTED: Session = TestData.Sessions[1];
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
    var PROVIDED: Session = TestData.NewSession;

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
    var RESPONSE: string = '';
    var PROVIDED: Session = TestData.Sessions[2];
    var EXPECTED_REQUEST: Session = {
      sessionId: PROVIDED.sessionId,
      startTime: PROVIDED.startTime,
      endTime: PROVIDED.endTime,
      currentPos: PROVIDED.currentPos
    }
   
    service.update(PROVIDED).subscribe(() => {
      // Add success messaging.
    });

    var req = httpController.expectOne('data/session/edit');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({params: EXPECTED_REQUEST});
    req.flush(RESPONSE);

    httpController.verify;
  });
});
