import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";

import "./css/Contact.css";

const Contact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	return (
		<div className="form">
			<Typography variant="h3">
				Love to hear from you, <br /> Get in touch👋
			</Typography>
			<div className="firstRow">
				<TextField
					required
					label="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="input"
				/>
				<TextField
					required
					type="email"
					label="Email"
					className="input"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="secondRow">
				<TextField
					required
					type="subject"
					label="Subject"
					className="secondInput"
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
				/>
			</div>

			<div className="thirdRow">
				<TextField
					required
					sx={{ width: 600 }}
					multiline
					rows={10}
					id="message"
					label="Message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
			</div>
			<Button color="secondary" variant="contained">
				Submit
			</Button>
		</div>
	);
};

export default Contact;
