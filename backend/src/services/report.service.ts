import { pool } from "../config/db";

export const createReport = async (
  data: any
) => {

  const query = `
    INSERT INTO reports
    (
      full_name,
      age,
      gender,
      description,
      last_seen_station,
      reporter_name,
      reporter_phone,
      image1,
      image2,
      image3
    )
    VALUES
    (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
    )
    RETURNING *
  `;

  const values = [
    data.fullName,
    data.age,
    data.gender,
    data.description,
    data.lastSeenStation,
    data.reporterName,
    data.reporterPhone,
    data.image1,
    data.image2,
    data.image3,
  ];

  const result =
    await pool.query(
      query,
      values
    );

  return result.rows[0];
};

export const getAllReports =
  async () => {

    const result =
      await pool.query(
        `
        SELECT *
        FROM reports
        ORDER BY id DESC
        `
      );

    return result.rows;
  };