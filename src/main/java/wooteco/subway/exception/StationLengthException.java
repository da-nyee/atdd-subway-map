package wooteco.subway.exception;

public class StationLengthException extends SubwayException {
    public StationLengthException() {
        super("2자 이상의 역 이름을 입력해주세요.");
    }
}
