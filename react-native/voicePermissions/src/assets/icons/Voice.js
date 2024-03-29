import * as React from 'react';
import Svg, {Defs, Path, Use} from 'react-native-svg';

function SvgVoice(props, svgRef) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 64 64"
      ref={svgRef}
      {...props}>
      <Defs>
        <Path
          id="voice_svg__a"
          d="M38.553 28.861c-.04.075-3.845 7.115-9.73 9.666l-.002-.002c-1.652.573-3.383.86-5.143.86-4.193 0-8.13-1.631-11.087-4.587-6.121-6.129-6.121-16.083 0-22.192C15.558 9.641 19.494 8 23.688 8c4.193 0 8.14 1.64 11.106 4.606a15.692 15.692 0 013.729 16.222l.03.033zm16.112 17.637c1.862 2.26 1.765 5.7-.222 7.834C53.44 55.409 52.1 56 50.681 56a5.13 5.13 0 01-3.53-1.43L32 40.148c4.834-2.755 8.093-8.04 9.18-9.994l1.048 1.271.951-1.021 2.895 3.108-1.126 1.21 9.717 11.776z"
        />
      </Defs>
      <Use fillRule="nonzero" xlinkHref="#voice_svg__a" />
    </Svg>
  );
}

const ForwardRef = React.forwardRef(SvgVoice);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
