
import ReactPlayer from 'react-player'
import Youtube from '@atoms/images/youtube'

export default function VideoPlayer({url, settings={}}) {
  settings = {
    controls: true,
    playsinline: true,
    width: "100%",
    height: "100%",
    ...settings
  };
  return (
    <div className="o-player-wrapper">
      <ReactPlayer className="o-react-player" url={url} {...settings}/>
    </div>
  );
}
