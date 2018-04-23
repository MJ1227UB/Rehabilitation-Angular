import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {YoutubeResponse} from './models/YoutubeResponse.model';
import {YoutubeResponseItemSnippet} from './models/YoutubeResponseItemSnippet.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class YoutubeService {

  YOUTUBE_API = 'https://www.googleapis.com/youtube/v3/videos';
  YOUTUBE_QUERY_PARAMS = '?part=id%2C+snippet&id=';
  YOUTUBE_API_KEY = '&key=AIzaSyAsMiGn7Z09Yh1zYyJlmPf0ak8XwZ7lFJY';

  constructor(private http: HttpClient) { }

  getVideoInformation(videoId: string) {
    return this.http.get(`${this.YOUTUBE_API}${this.YOUTUBE_QUERY_PARAMS}${videoId}${this.YOUTUBE_API_KEY}`);
  }

  getIdFromURL(url: string) {
    // adapted from http://brandly.github.io/angular-youtube-embed/ and http://stackoverflow.com/a/5831191/1614967
    var youtubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;

    // https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig
    function contains(str: string, substr: string) {
      return (str.indexOf(substr) > -1);
    }

    let id = url.replace(youtubeRegexp, '$1');

    if (contains(id, ';')) {
      const pieces = id.split(';');

      if (contains(pieces[1], '%')) {
        // links like this:
        // "http://www.youtube.com/attribution_link?a=pxa6goHqzaA&amp;u=%2Fwatch%3Fv%3DdPdgx30w9sU%26feature%3Dshare"
        // have the real query string URI encoded behind a ';'.
        // at this point, `id is 'pxa6goHqzaA;u=%2Fwatch%3Fv%3DdPdgx30w9sU%26feature%3Dshare'
        const uriComponent = decodeURIComponent(id.split(';')[1]);
        id = ('http://youtube.com' + uriComponent)
          .replace(youtubeRegexp, '$1');
      } else {
        // https://www.youtube.com/watch?v=VbNF9X1waSc&amp;feature=youtu.be
        // `id` looks like 'VbNF9X1waSc;feature=youtu.be' currently.
        // strip the ';feature=youtu.be'
        id = pieces[0];
      }
    } else if (contains(id, '#')) {
      // id might look like '93LvTKF_jW0#t=1'
      // and we want '93LvTKF_jW0'
      id = id.split('#')[0];
    }

    return id;
  }

}
