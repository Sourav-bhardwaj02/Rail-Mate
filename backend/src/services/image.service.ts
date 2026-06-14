import { pool } from "../config/db";

export const attachImagesToReport =
  async (
    reportId: number,
    paths: string[]
  ) => {

    const image1 =
      paths[0] || null;

    const image2 =
      paths[1] || null;

    const image3 =
      paths[2] || null;

    const result =
      await pool.query(
        `
        UPDATE reports
        SET
          image1 = $1,
          image2 = $2,
          image3 = $3
        WHERE id = $4
        RETURNING *
        `,
        [
          image1,
          image2,
          image3,
          reportId
        ]
      );

    return result.rows[0];
  };