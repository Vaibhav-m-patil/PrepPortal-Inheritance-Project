import p1415 from "../../assets/stats/p1415.pdf";
import p1516 from "../../assets/stats/p1516.pdf";
import p1617 from "../../assets/stats/p1617.pdf";
import p1718 from "../../assets/stats/p1718.pdf";
import p1819 from "../../assets/stats/p1819.pdf";
import p1920 from "../../assets/stats/p1920.pdf";
import p2021 from "../../assets/stats/p2021.pdf";
import p2122 from "../../assets/stats/p2122.pdf";
import p2223 from "../../assets/stats/p2223.pdf";
import p2425 from "../../assets/stats/p2425.pdf";

const reports = [
  { year: "2014/15", file: p1415 },
  { year: "2015/16", file: p1516 },
  { year: "2016/17", file: p1617 },
  { year: "2017/18", file: p1718 },
  { year: "2018/19", file: p1819 },
  { year: "2019/20", file: p1920 },
  { year: "2020/21", file: p2021 },
  { year: "2021/22", file: p2122 },
  { year: "2022/23", file: p2223 },
  { year: "2024/25", file: p2425 },
];

function Stats() {
  return (
    <div>
      <h2>Placement Reports 2014–2015 to 2024–2025</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {reports.map((report, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "10px",
            }}
          >
            <h4 style={{ textAlign: "center" }}>
              {report.year}
            </h4>

            <a
              href={report.file}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  height: "220px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f5f5f5",
                  cursor: "pointer",
                }}
              >
                <strong>Click to View PDF</strong>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;
