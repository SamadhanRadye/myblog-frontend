import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { m } from 'framer-motion';

function WriteBlog({ user }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Technology');
    const [tags, setTags] = useState('');
    const [fontSize, setFontSize] = useState('16');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [textAlign, setTextAlign] = useState('left');
    const [lineHeight] = useState('1.5');
    const [customColor, setCustomColor] = useState('#000000');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [savedBlogs, setSavedBlogs] = useState(JSON.parse(localStorage.getItem('blogs') || '[]'));
    const [textColor, setTextColor] = useState('black');
    const contentRef = useRef(null);

    const sidebarStyle = {
        position: 'fixed',
        top: '56px',
        left: '0',
        width: '280px',
        height: 'calc(100vh - 56px)',
        padding: '15px',
        overflowY: 'auto',
        zIndex: '1000',
        borderRight: '2px solid ',
        backgroundColor: 'black',
    };

    const contentStyle = {
        marginLeft: '280px',
        marginTop: '56px',
        padding: '30px',
        backgroundColor: 'black',
        minHeight: 'calc(100vh - 56px)',
        width: '80vw',
    };

    const editorStyle = {
        width: '100%',
        minHeight: '400px',
        backgroundColor: 'white',
        color: textColor,
        fontSize: `${fontSize}px`,
        fontFamily: fontFamily,
        textAlign: textAlign,
        lineHeight: lineHeight,
        fontWeight: isBold ? 'bold' : 'normal',
        fontStyle: isItalic ? 'italic' : 'normal',
        textDecoration: `${isUnderline ? 'underline' : ''} ${isStrikethrough ? 'line-through' : ''}`,
        border: '1px solid #ced4da',
        borderRadius: '8px',
        padding: '15px',
        resize: 'vertical',
        transition: 'all 0.3s ease',
    };

    const buttonStyle = {
        width: '100%',
        marginBottom: '8px',
        fontSize: '14px',
    };

    const smallButtonStyle = {
        width: '48%',
        marginBottom: '8px',
        fontSize: '12px',
    };

    const handleColorChange = (color) => setTextColor(color);
    const toggleBold = () => setIsBold(!isBold);
    const toggleItalic = () => setIsItalic(!isItalic);
    const toggleUnderline = () => setIsUnderline(!isUnderline);
    const toggleStrikethrough = () => setIsStrikethrough(!isStrikethrough);

    const handleUppercase = () => setContent(content.toUpperCase());
    const handleLowercase = () => setContent(content.toLowerCase());
    const handleCapitalize = () =>
        setContent(content.replace(/\b\w/g, (char) => char.toUpperCase()));

    const insertTemplate = (template) => {
        const templates = {
            intro: 'Welcome to my blog! Today I want to share with you...\n\n',
            conclusion:
                '\n\nThank you for reading! Feel free to share your thoughts in the comments below.',
            quote: '\n\n> "Insert your inspiring quote here" - Author Name\n\n',
        };
        setContent(content + templates[template]);
    };

    const wordCount = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;
    const charCount = content.length;
    const readingTime = Math.ceil(wordCount / 200);

    const handleSave = async () => {
        if (!user) {
            alert('⚠️ You must be logged in to write a blog.');
            return;
        }
        if (!title.trim() || !content.trim()) {
            alert('Please enter both title and content!');
            return;
        }

        const postData = {
            title,
            content,
            category,
            tags: tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
            authorId: user.id,
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/api/posts/create',
                postData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.success) {
                alert('✅ Blog created successfully!');
                const newBlog = {
                    id: response.data.post.id,
                    title: response.data.post.title,
                    content: response.data.post.content,
                    author: user.username,
                    category: response.data.post.category,
                    tags: response.data.post.tags,
                    createdAt: response.data.post.createdAt,
                };
                const updatedBlogs = [...savedBlogs, newBlog];
                setSavedBlogs(updatedBlogs);
                localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
                setTitle('');
                setContent('');
                setCategory('Technology');
                setTags('');
            } else {
                alert('❌ Error: ' + response.data.message);
            }
        } catch (err) {
            console.error(err);
            alert('❌ Something went wrong while saving the blog.');
        }
    };

    const handleExport = () => {
        const blogData = {
            title,
            content,
            author: user?.username || 'Anonymous',
            category,
            tags: tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
            createdAt: new Date().toLocaleString(),
            wordCount,
            readingTime,
        };

        const dataStr =
            'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(blogData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', `${title || 'blog'}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const Symbol = { color: 'grey' };

    return (
        <>
            <style>
                {`
                    @keyframes fadeIn {
                        0% { opacity: 0; transform: translateY(20px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    .sidebar {
                        animation: fadeIn 0.5s ease-out forwards;
                    }
                    .content-area {
                        animation: fadeIn 0.6s ease-out forwards;
                    }
                    .form-group, .preview-section, .quick-actions, .text-formatting, .font-settings, .color-settings, .text-transform, .templates, .statistics {
                        animation: fadeIn 0.7s ease-out forwards;
                        animation-delay: calc(0.1s * var(--animation-order));
                    }
                    .form-control, .btn {
                        transition: all 0.3s ease;
                    }
                    .form-control:hover, .btn:hover {
                        transform: scale(1.02);
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    }
                    .color-swatch {
                        transition: transform 0.2s ease;
                    }
                    .color-swatch:hover {
                        transform: scale(1.1);
                    }
                    .modal-content {
                        animation: fadeIn 0.3s ease-out forwards;
                    }
                `}
            </style>
            {!user ? (
                <h3 className="text-center mt-5 text-red-500 font-bold">⚠️ Please login to write a blog</h3>
            ) : (
                <div className="flex mt-14 bg-gray-100 outdiv container1">
                    {/* Sidebar */}
                    <div style={sidebarStyle} className="sidebar outdiv container1">
                        <h5 className="mb-3 text-blue-600 font-bold">📝 Blog Editor Tools</h5>

                        {/* Quick Actions */}
                        <div className="mb-3 quick-actions" style={{ '--animation-order': 1 }}>
                            <h6 className="mb-2">🚀 Quick Actions</h6>
                            <div className="flex justify-between">
                                <Button variant="success" style={smallButtonStyle} onClick={handleSave}>
                                    💾 Save
                                </Button>
                                <Button variant="info" style={smallButtonStyle} onClick={handleExport}>
                                    📤 Export
                                </Button>
                            </div>
                        </div>

                        <hr />

                        {/* Text Formatting */}
                        <div className="mb-3 text-formatting" style={{ '--animation-order': 2 }}>
                            <h6 className="mb-2">✨ Text Formatting</h6>
                            <div className="flex justify-between mb-2">
                                <Button
                                    variant={isBold ? 'dark' : 'outline-dark'}
                                    style={smallButtonStyle}
                                    onClick={toggleBold}
                                >
                                    <strong style={Symbol}>B</strong>
                                </Button>
                                <Button
                                    variant={isItalic ? 'dark' : 'outline-dark'}
                                    style={smallButtonStyle}
                                    onClick={toggleItalic}
                                >
                                    <em style={Symbol}>I</em>
                                </Button>
                            </div>
                            <div className="flex justify-between mb-2">
                                <Button
                                    variant={isUnderline ? 'dark' : 'outline-dark'}
                                    style={smallButtonStyle}
                                    onClick={toggleUnderline}
                                >
                                    <u style={Symbol}>U</u>
                                </Button>
                                <Button
                                    variant={isStrikethrough ? 'dark' : 'outline-dark'}
                                    style={smallButtonStyle}
                                    onClick={toggleStrikethrough}
                                >
                                    <s style={Symbol}>S</s>
                                </Button>
                            </div>
                        </div>

                        {/* Font Settings */}
                        <div className="mb-3 font-settings" style={{ '--animation-order': 3 }}>
                            <h6 className="mb-2">🎨 Font Settings</h6>
                            <Form.Group className="mb-2">
                                <Form.Label className="text-sm">Font Family</Form.Label>
                                <Form.Select
                                    size="sm"
                                    value={fontFamily}
                                    onChange={(e) => setFontFamily(e.target.value)}
                                    className="transition duration-300 hover:shadow-md"
                                >
                                    <option value="Arial">Arial</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Courier New">Courier New</option>
                                </Form.Select>
                            </Form.Group>
                            <div className="flex justify-between mb-2">
                                <div className="w-1/2">
                                    <Form.Label className="text-sm">Size</Form.Label>
                                    <Form.Select
                                        size="sm"
                                        value={fontSize}
                                        onChange={(e) => setFontSize(e.target.value)}
                                        className="transition duration-300 hover:shadow-md"
                                    >
                                        <option value="12">12px</option>
                                        <option value="14">14px</option>
                                        <option value="16">16px</option>
                                        <option value="18">18px</option>
                                        <option value="20">20px</option>
                                        <option value="24">24px</option>
                                    </Form.Select>
                                </div>
                                <div className="w-1/2">
                                    <Form.Label className="text-sm">Align</Form.Label>
                                    <Form.Select
                                        size="sm"
                                        value={textAlign}
                                        onChange={(e) => setTextAlign(e.target.value)}
                                        className="transition duration-300 hover:shadow-md"
                                    >
                                        <option value="left">Left</option>
                                        <option value="center">Center</option>
                                        <option value="right">Right</option>
                                        <option value="justify">Justify</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </div>

                        {/* Color Settings */}
                        <div className="mb-3 color-settings" style={{ '--animation-order': 4 }}>
                            <h6 className="mb-2">🌈 Colors</h6>
                            <Button
                                variant="outline-primary"
                                style={buttonStyle}
                                onClick={() => setShowColorPicker(true)}
                                className="transition duration-300 hover:shadow-lg"
                            >
                                🎨 Custom Color Picker
                            </Button>
                            <div className="grid grid-cols-3 gap-1 mb-2">
                                {['#000000', '#dc3545', '#198754', '#0d6efd', '#ffc107', '#6f42c1'].map((color) => (
                                    <div
                                        key={color}
                                        className="color-swatch"
                                        style={{
                                            width: '100%',
                                            height: '25px',
                                            backgroundColor: color,
                                            cursor: 'pointer',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                        }}
                                        onClick={() => handleColorChange(color)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Text Transform */}
                        <div className="mb-3 text-transform" style={{ '--animation-order': 5 }}>
                            <h6 className="mb-2">🔄 Transform Text</h6>
                            <Button
                                variant="primary"
                                size="sm"
                                style={buttonStyle}
                                onClick={handleUppercase}
                                className="transition duration-300 hover:shadow-lg"
                            >
                                UPPERCASE
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                style={buttonStyle}
                                onClick={handleLowercase}
                                className="transition duration-300 hover:shadow-lg"
                            >
                                lowercase
                            </Button>
                            <Button
                                variant="info"
                                size="sm"
                                style={buttonStyle}
                                onClick={handleCapitalize}
                                className="transition duration-300 hover:shadow-lg"
                            >
                                Capitalize
                            </Button>
                        </div>

                        {/* Templates */}
                        <div className="mb-3 templates" style={{ '--animation-order': 6 }}>
                            <h6 className="mb-2">📄 Quick Templates</h6>
                            <Button
                                variant="outline-success"
                                size="sm"
                                style={buttonStyle}
                                onClick={() => insertTemplate('intro')}
                                className="transition duration-300 hover:shadow-lg"
                            >
                                📝 Intro Template
                            </Button>
                            <Button
                                variant="outline-warning"
                                size="sm"
                                style={buttonStyle}
                                onClick={() => insertTemplate('quote')}
                                className="transition duration-300 hover:shadow-lg"
                            >
                                💬 Quote Template
                            </Button>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                style={buttonStyle}
                                onClick={() => insertTemplate('conclusion')}
                                className="transition duration-300 hover:shadow-lg"
                            >
                                🏁 Conclusion Template
                            </Button>
                        </div>

                        {/* Statistics */}
                        <div
                            className="mt-3 p-2 bg-gray-200 rounded-lg statistics"
                            style={{ '--animation-order': 7 }}
                        >
                            <h6 className="mb-2" style={Symbol}>
                                📊 Statistics
                            </h6>
                            <small>
                                <div style={Symbol}>📝 Words: {wordCount}</div>
                                <div style={Symbol}>🔤 Characters: {charCount}</div>
                                <div style={Symbol}>⏱️ Reading Time: {readingTime} min</div>
                            </small>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div style={contentStyle} className="content-area container1">
                        <div className="container-fluid">
                            <h1 className="mb-4 text-center text-3xl font-bold text-gray-800">✍️ Blog Editor</h1>

                            {/* Blog Metadata */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 opacity-70 form-group" style={{ '--animation-order': 1 }}>
                                <Form.Group>
                                    <Form.Label className="font-bold">📰 Blog Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your amazing blog title..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="text-lg p-3 transition duration-300 hover:shadow-md"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="font-bold">👤 Author</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Your name"
                                        value={user.username}
                                        readOnly
                                        className="transition duration-300 hover:shadow-md"
                                    />
                                </Form.Group>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 opacity-70 form-group" style={{ '--animation-order': 2 }}>
                                <Form.Group>
                                    <Form.Label className="font-bold">📂 Category</Form.Label>
                                    <Form.Select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="transition duration-300 hover:shadow-md"
                                    >
                                        <option value="Technology">Technology</option>
                                        <option value="Lifestyle">Lifestyle</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Food">Food</option>
                                        <option value="Health">Health</option>
                                        <option value="Education">Education</option>
                                        <option value="Business">Business</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="font-bold">🏷️ Tags (comma separated)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="react, javascript, web development"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        className="transition duration-300 hover:shadow-md"
                                    />
                                </Form.Group>
                            </div>

                            {/* Main Editor */}
                            <Form.Group className="mb-4 opacity-70 form-group" style={{ '--animation-order': 3 }}>
                                <Form.Label className="font-bold">✏️ Blog Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    ref={contentRef}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Start writing your amazing blog post here... 

Tell your story, share your knowledge, inspire your readers!"
                                    style={editorStyle}
                                    className="transition duration-300 hover:shadow-lg"
                                />
                            </Form.Group>

                            {/* Preview Section */}
                            <div className="mt-5 opacity-70 preview-section" style={{ '--animation-order': 4 }}>
                                <h2 className="mb-3 text-2xl font-bold">👀 Preview</h2>
                                <div
                                    style={{
                                        border: '2px dashed #dee2e6',
                                        borderRadius: '12px',
                                        padding: '30px',
                                        backgroundColor: '#f8f9fa',
                                        minHeight: '200px',
                                    }}
                                >
                                    {title && <h1 className="mb-3 text-gray-700">{title}</h1>}
                                    {user && (
                                        <p className="text-gray-500 mb-3">
                                            By {user.username} | {category} | {new Date().toLocaleDateString()}
                                        </p>
                                    )}
                                    {tags && (
                                        <div className="mb-3">
                                            {tags.split(',').map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                                >
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div
                                        style={{
                                            ...editorStyle,
                                            border: 'none',
                                            backgroundColor: 'white',
                                            whiteSpace: 'pre-wrap',
                                        }}
                                    >
                                        {content || 'Your blog content will appear here...'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Color Picker Modal */}
                    <Modal show={showColorPicker} onHide={() => setShowColorPicker(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>🎨 Custom Color Picker</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-3">
                                <Form.Label className="font-bold">Text Color</Form.Label>
                                <Form.Control
                                    type="color"
                                    value={customColor}
                                    onChange={(e) => setCustomColor(e.target.value)}
                                    className="w-full h-10"
                                />
                            </div>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    handleColorChange(customColor);
                                    setShowColorPicker(false);
                                }}
                                className="transition duration-300 hover:shadow-lg"
                            >
                                Apply Color
                            </Button>
                        </Modal.Body>
                    </Modal>
                </div>
            )}
        </>
    );
}

export default WriteBlog;