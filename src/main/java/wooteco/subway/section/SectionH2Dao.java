package wooteco.subway.section;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.Objects;

@Repository
public class SectionH2Dao {

    private final JdbcTemplate jdbcTemplate;

    public SectionH2Dao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Section save(Long lineId, Section section) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        String sql = "INSERT INTO SECTION (line_id, up_station_id, down_station_id, distance) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, new String[]{"id"});
            ps.setLong(1, lineId);
            ps.setLong(2, section.getUpStationId());
            ps.setLong(3, section.getDownStationId());
            ps.setInt(4, section.getDistance());
            return ps;
        }, keyHolder);
        long id = Objects.requireNonNull(keyHolder.getKey()).longValue();
        return new Section(id, section.getUpStationId(), section.getDownStationId(), section.getDistance());
    }

    public List<Section> findById(Long lineId) {
        String sql = "SELECT * FROM SECTION WHERE line_id=?";
        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {
                    Section section = new Section(
                            rs.getLong("id"),
                            rs.getLong("up_station_id"),
                            rs.getLong("down_station_id"),
                            rs.getInt("distance")
                    );
                    return section;
                }, lineId);
    }
}
