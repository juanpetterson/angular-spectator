import { TestBed } from '@angular/core/testing';

import { MediaService } from './media.service';
import Medias from '../../../assets/data/medias';
import { Media } from 'app/shared/models/media';

const testEachForValue = (property: string, array: Array<any>) => {
  return array.every((item) => item[property]);
};

describe('MediaService', () => {
  let service: MediaService;
  let MEDIAS: Media[];

  beforeEach(() => {
    MEDIAS = [...Medias];

    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all medias', (done) => {
    service.getMedias().subscribe((medias) => {
      expect(medias).toBeTruthy();
      expect(medias.length).toEqual(MEDIAS.length);

      done();
    });
  });

  it('should retrieve the media with the ID passed when getMedia is called', (done) => {
    service.getMedia(MEDIAS[0].id).subscribe((media) => {
      expect(media).toEqual(MEDIAS[0]);

      done();
    });
  });

  it('should retrieve the medias which contains originals property when getMediasOriginals is called', (done) => {
    service.getMediasOriginals().subscribe((medias) => {
      const isOriginals = testEachForValue('originals', medias);
      expect(isOriginals).toBeTruthy();

      done();
    });
  });

  it('should retrieve one medias when getBillboardMedia is called', (done) => {
    service.getBillboardMedia().subscribe((media) => {
      expect(media).toBeTruthy();

      done();
    });
  });
});
