import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function NeedHelp() {
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize tooltips
        const overlayButtons = document.querySelectorAll('.overlay-button');
        overlayButtons.forEach(button => {
            button.addEventListener('mouseenter', function (event) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.innerHTML = button.getAttribute('data-html');
                document.body.appendChild(tooltip);

                const updateTooltipPosition = (mouseX, mouseY) => {
                    tooltip.style.top = `${mouseY + 10}px`;
                    tooltip.style.left = `${mouseX + 10}px`; 
                };

                updateTooltipPosition(event.clientX, event.clientY);

                button.addEventListener('mousemove', function (event) {
                    updateTooltipPosition(event.clientX, event.clientY);
                });

                button.addEventListener('mouseleave', function () {
                    if (tooltip) {
                        tooltip.remove();
                    }
                });
            });
        });
    }, []);

    return (
        <div className="need-help-page">
            <div className="recommend-container">
                <h2>We recommend you to start with:</h2>
                <div className="recommend-items">
                    <div className="category-item" onClick={() => navigate('/category/Motherboards')}>
                        <img src="/images/motherboards.png" alt="Motherboards" />
                        <h3>MOTHERBOARDS</h3>
                    </div>
                    <div className="category-item" onClick={() => navigate('/category/CPU')}>
                        <img src="/images/cpu.png" alt="CPU" />
                        <h3>CPU</h3>
                    </div>
                </div>
            </div>

            <div className="learn-more-container">
                <div className="learn-more-content">
                    <div className="learn-more-image">
                        <img src="/images/helpscheme.png" alt="Help Placeholder" />
                    </div>
                    <div className="learn-more-article">
                        <h2>Want to know more?</h2>
                        <h3>Where to start when building your personal computer?</h3>
                        <p>
                            Building your personal computer (PC) can be an exciting and rewarding experience.
                            However, for a successful build, there are several key factors to consider.
                        </p>
                        <h4>1. Define the purpose of the build</h4>
                        <p>
                            First and foremost, decide the purpose of your PC build. Will it be a gaming computer,
                            a workstation for video editing, or just a home-use machine? This will help you
                            determine the components you need.
                        </p>
                        <h4>2. Research components</h4>
                        <p>
                            After defining the purpose, research the various components required:
                            <ul>
                                <li>CPU</li>
                                <li>Motherboard</li>
                                <li>RAM</li>
                                <li>Storage (HDD/SSD)</li>
                                <li>Power Supply Unit (PSU)</li>
                                <li>Graphics Card (if needed)</li>
                                <li>Case</li>
                                <li>Cooling system</li>
                            </ul>
                        </p>
                        <h4>3. Compatibility</h4>
                        <p>
                            Ensure that all chosen components are compatible with each other. This includes the CPU and motherboard socket, RAM type supported by the motherboard, power requirements of the components, and size of the components relative to the case.
                        </p>
                        <h4>4. Budget</h4>
                        <p>
                            Set a budget for your build and try to find the best components within your price range. Consider future-proofing your system by allowing for upgrades.
                        </p>
                        <h4>5. Assembly</h4>
                        <p>
                            Once you have all the components, follow a detailed guide or tutorial to assemble your PC. Be patient and meticulous to avoid damaging any parts.
                        </p>
                        <h4>6. Testing</h4>
                        <p>
                            After assembly, test your PC to ensure everything is working correctly. Install the operating system, drivers, and perform stress tests to check stability.
                        </p>
                        <p>
                            Building a PC can be a complex task, but with careful planning and research, you can create a system tailored to your needs and preferences.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NeedHelp;
