"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function UnauthorizedPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(to right, #678d58, #74d3ae)",
        padding: "20px",
      }}
    >
      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "20px",
          padding: "40px",
          textAlign: "center",
          maxWidth: "420px",
          width: "100%",
          boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
          color: "white",
        }}
      >
        {/* ICON */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            fontSize: "70px",
            marginBottom: "10px",
          }}
        >
          🚫
        </motion.div>

        {/* TITLE */}
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            marginBottom: "10px",
            textShadow: "0 3px 15px rgba(0,0,0,0.3)",
          }}
        >
          Access Denied
        </h1>

        {/* TEXT */}
        <p
          style={{
            fontSize: "1rem",
            opacity: 0.9,
            lineHeight: "1.5",
          }}
        >
          You don’t have permission to enter this area.
          <br />
          Please contact the admin if you think this is a mistake.
        </p>

        {/* BUTTONS */}
        <div
          style={{
            marginTop: "25px",
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "10px 22px",
                borderRadius: "999px",
                border: "none",
                fontWeight: "700",
                cursor: "pointer",
                background: "white",
                color: "#678d58",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              }}
            >
              Go Home
            </motion.button>
          </Link>

          <Link href="/browse-tasks">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "white",
                color: "#678d58",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "10px 22px",
                borderRadius: "999px",
                border: "2px solid white",
                fontWeight: "700",
                cursor: "pointer",
                background: "transparent",
                color: "white",
              }}
            >
              Browse Tasks
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}