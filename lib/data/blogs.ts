// ─── Types ────────────────────────────────────────────────────────────────────
export interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  coverGradient: string;   // Tailwind gradient classes (fallback when no real image)
  coverImage?: string;     // Optional real image URL
  authorSlug: string;
  authorName: string;
  authorRole: string;
  authorInitials: string;
  authorAvatarColor: string;
  publishedAt: string;     // Display string
  publishedISO: string;    // ISO date for sorting
  readTime: number;        // minutes
  tags: string[];
  isFeatured?: boolean;
  content: string;         // HTML content
}

// ─── Blog Data ────────────────────────────────────────────────────────────────
export const blogs: Blog[] = [
  // ─── Blog 1 ─────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: "yolov11-fall-detection-edge-iot",
    title: "Implementing Real-Time Fall Detection with YOLOv11 on NVIDIA Jetson Orin",
    excerpt:
      "A deep-dive into building a production-ready fall detection system for elderly care using YOLOv11 pose estimation, deployed on a Jetson Orin NX edge node — achieving sub-80ms alert latency end-to-end.",
    coverGradient: "from-teal-600 via-brand-700 to-navy-900",
    coverImage: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=1200&q=80",
    authorSlug: "rishith-reddy",
    authorName: "Rishith Reddy V S",
    authorRole: "PhD Scholar",
    authorInitials: "RR",
    authorAvatarColor: "from-teal-500 to-brand-600",
    publishedAt: "November 12, 2024",
    publishedISO: "2024-11-12",
    readTime: 12,
    tags: ["YOLOv11", "Fall Detection", "Edge AI", "IoT", "Jetson", "Healthcare"],
    isFeatured: true,
    content: `
<p class="lead">Falls are the leading cause of injury-related death in adults over 65. In India, where elderly care infrastructure is limited, an affordable, AI-powered fall detection system that operates entirely on-device — without cloud dependency — could save thousands of lives. This post walks through our end-to-end system from model selection to deployment.</p>

<h2>Why YOLOv11?</h2>
<p>When we started this project, the obvious choices were MediaPipe Pose and OpenPose. Both are mature, well-documented, and have decent accuracy. But they fall short on two fronts critical to our use case: <strong>real-time performance on embedded hardware</strong> and <strong>robustness to occlusion</strong>.</p>
<p>YOLOv11, the latest iteration in the YOLO family, introduced a unified architecture for simultaneous object detection and pose estimation. What makes it compelling for fall detection:</p>
<ul>
  <li><strong>Keypoint confidence scores</strong> — we get per-keypoint confidence, not just position. This lets us gracefully handle partially occluded poses (e.g., person sitting behind a table).</li>
  <li><strong>Speed</strong> — YOLOv11n (nano) runs at 87 FPS on Jetson Orin NX with TensorRT INT8 quantization. Even YOLOv11s (small) hits 61 FPS — comfortably above our 30 FPS requirement.</li>
  <li><strong>Single-model simplicity</strong> — detection + pose in one forward pass, no two-stage pipeline.</li>
</ul>

<h2>The Fall Detection Pipeline</h2>
<p>Our system has four stages that run in a continuous loop on the Jetson Orin NX:</p>

<h3>Stage 1 — Pose Estimation (YOLOv11s-pose)</h3>
<p>We run YOLOv11s-pose on 640×480 frames captured from a wide-angle USB camera mounted in the corner of a room at ~2.5m height. The model outputs 17 COCO keypoints with x, y, and confidence for each person in frame.</p>
<pre><code class="language-python">from ultralytics import YOLO

model = YOLO("yolo11s-pose.pt")
model.export(format="engine", int8=True, data="coco-pose.yaml")  # TensorRT export

results = model(frame, stream=True, conf=0.4, imgsz=640)
for r in results:
    keypoints = r.keypoints.xyn.cpu().numpy()  # Normalized keypoints
    confs     = r.keypoints.conf.cpu().numpy()
</code></pre>

<h3>Stage 2 — Biomechanical Feature Extraction</h3>
<p>Raw keypoints are noisy. We compute a set of biomechanical features that are more semantically meaningful for fall classification:</p>
<ul>
  <li><strong>Body angle (θ)</strong>: Angle of the spine vector (neck → hip midpoint) with vertical. Upright pose ≈ 0–15°, falling pose &gt; 45°.</li>
  <li><strong>Aspect ratio (AR)</strong>: Bounding box height / width. Standing: AR &gt; 2.0. Lying on floor: AR &lt; 0.8.</li>
  <li><strong>Centroid velocity</strong>: Rate of change of body centroid over 5 frames. Sudden downward velocity spike → likely fall.</li>
  <li><strong>Hip height (normalized)</strong>: Hip keypoint y-coordinate normalized by frame height. Low hip height + low aspect ratio = floor-level position.</li>
</ul>

<h3>Stage 3 — Temporal Fall Classifier</h3>
<p>We use a lightweight LSTM (2 layers, hidden size 64) that takes a sliding window of 15 frames of features as input and classifies each window as: <code>Normal</code>, <code>Pre-fall</code>, <code>Fall</code>, or <code>Post-fall</code>.</p>
<p>Training data: 4,800 fall sequences from URFD, Le2i, and our own in-lab collection (recorded with consent from 8 volunteers). Augmented with left-right flips, temporal jitter, and Gaussian noise on keypoints.</p>
<p><strong>Validation accuracy</strong>: 96.3% on URFD test set | <strong>F1 (Fall class)</strong>: 0.943</p>

<h3>Stage 4 — Alert and Notification</h3>
<p>When a fall event is confirmed (3 consecutive fall-positive windows), the system:</p>
<ol>
  <li>Logs the event with timestamp and a JPEG snapshot to local storage.</li>
  <li>Publishes an MQTT message to a home hub (Raspberry Pi 4) over the local LAN.</li>
  <li>The hub sends an SMS via Twilio to pre-registered caregivers within 2–3 seconds.</li>
  <li>A local buzzer alarm activates (can be disabled by the person themselves if it was a false positive).</li>
</ol>

<h2>End-to-End Latency Breakdown</h2>
<table>
  <thead><tr><th>Stage</th><th>Latency (ms)</th></tr></thead>
  <tbody>
    <tr><td>Camera capture + decode</td><td>8</td></tr>
    <tr><td>YOLOv11s-pose (TensorRT INT8)</td><td>16</td></tr>
    <tr><td>Feature extraction (CPU)</td><td>3</td></tr>
    <tr><td>LSTM inference (CPU)</td><td>2</td></tr>
    <tr><td>Alert dispatch (MQTT)</td><td>4</td></tr>
    <tr><td><strong>Total</strong></td><td><strong>33ms per frame</strong></td></tr>
  </tbody>
</table>
<p>Alert latency (time from fall to SMS) is approximately 75–85ms for confirmed falls (3-frame window confirmation).</p>

<h2>Challenges and Lessons Learned</h2>
<blockquote>
  <p>"The hardest part wasn't the model — it was making the system reliable enough that a 75-year-old living alone could trust it with their life."</p>
</blockquote>
<p>Three challenges stood out:</p>
<p><strong>1. False positives from intentional floor activities</strong> (yoga, playing with grandchildren) — solved by requiring a minimum duration (2 seconds) at floor level before triggering an alert, combined with the pre-fall velocity feature.</p>
<p><strong>2. Lighting variation</strong> — Indian homes vary enormously. We added test-time data augmentation (random brightness/contrast) and found performance degraded only 2.1% in near-dark conditions (lit only by a TV screen).</p>
<p><strong>3. Camera placement sensitivity</strong> — Our system is robust to camera angles between 30° and 60° from vertical, but fails below 25° (too shallow). We now include a calibration wizard in the setup app.</p>

<h2>Next Steps</h2>
<p>We are currently extending the system with multi-camera fusion (2–3 cameras per room) and exploring TinyML options for deployment on even lower-power hardware (STM32H7 with a CMOS sensor) to bring the BOM cost below ₹3,000. If you're interested in collaborating or testing the system, reach out at <a href="mailto:rishith@iittp.ac.in">rishith@iittp.ac.in</a>.</p>
`,
  },

  // ─── Blog 2 ─────────────────────────────────────────────────────────────
  {
    id: 2,
    slug: "masked-autoencoders-satellite-imagery",
    title: "Masked Autoencoders for Satellite Imagery: Adapting MAE to Multi-Spectral Data",
    excerpt:
      "Natural image MAE is well-understood. But satellite imagery has 13 spectral bands, geographic context, and temporal coherence. Here's how we adapted the framework for ISRO's remote sensing projects.",
    coverGradient: "from-indigo-600 via-purple-700 to-brand-900",
    coverImage: "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=1200&q=80",
    authorSlug: "arjun-mehta",
    authorName: "Arjun Mehta",
    authorRole: "PhD Scholar",
    authorInitials: "AM",
    authorAvatarColor: "from-orange-500 to-rose-600",
    publishedAt: "October 28, 2024",
    publishedISO: "2024-10-28",
    readTime: 10,
    tags: ["MAE", "Self-Supervised Learning", "Remote Sensing", "Satellite", "ISRO", "Transformer"],
    isFeatured: true,
    content: `
<p class="lead">Masked Autoencoders (He et al., 2021) showed that masking random patches of an image and training a ViT to reconstruct them produces powerful visual representations — transferable to dozens of downstream tasks. But what happens when you apply this to satellite imagery with 13 spectral bands, each carrying distinct geophysical information?</p>

<h2>The Problem with Naive Application</h2>
<p>Running standard MAE on satellite imagery with only RGB bands works <em>okay</em> — you get decent features for land use classification. But you leave an enormous amount of information on the table. Sentinel-2 images have bands covering:</p>
<ul>
  <li><strong>VNIR</strong> (Visible and Near-Infrared): B2, B3, B4, B8 — vegetation density, water bodies</li>
  <li><strong>Red-Edge</strong>: B5, B6, B7 — plant health, chlorophyll content</li>
  <li><strong>SWIR</strong> (Short-Wave Infrared): B11, B12 — soil moisture, mineral identification</li>
  <li><strong>Atmospheric</strong>: B1, B9, B10 — cloud detection, aerosol correction</li>
</ul>
<p>A naive MAE sees all 13 channels as equal. But reconstructing a SWIR band from RGB patches is a fundamentally different task than reconstructing a visible band. We need the model to understand <em>spectral relationships</em>.</p>

<h2>Our Approach: Spectral-Aware Masking</h2>
<p>We modify the MAE masking strategy in two key ways:</p>

<h3>1. Band-Group Masking</h3>
<p>Instead of masking random spatial patches (which is band-agnostic), we group bands by spectral category and apply structured masking:</p>
<pre><code class="language-python">BAND_GROUPS = {
    "vnir": [0, 1, 2, 6],      # B2, B3, B4, B8
    "red_edge": [3, 4, 5],      # B5, B6, B7
    "swir": [9, 10],            # B11, B12
    "atmospheric": [7, 8, 11],  # B8A, B9, B10
}

def spectral_mask(x, mask_ratio=0.75, group_mask_prob=0.5):
    # With 50% probability, mask an entire band group
    if random.random() &lt; group_mask_prob:
        group = random.choice(list(BAND_GROUPS.values()))
        x[:, group, :, :] = 0  # Mask entire spectral group
    # Standard random spatial masking on remaining bands
    return apply_spatial_mask(x, mask_ratio)
</code></pre>

<h3>2. Geospatial Context Tokens</h3>
<p>We prepend a geospatial context token to each image's patch sequence. This token encodes the approximate location (binned latitude/longitude) and acquisition season. This allows the model to learn that "desert sand in SWIR looks different from agricultural soil" and "summer vegetation NDVI is different from winter."</p>

<h2>Architecture Modifications</h2>
<p>We use a ViT-B/16 encoder (86M parameters) with a lightweight 4-layer decoder. The only architectural change is in the patch embedding layer: instead of 3-channel RGB, we have a learned 13-channel projection with band-specific normalization statistics computed from 1M+ Sentinel-2 tiles.</p>

<h2>Training Setup</h2>
<ul>
  <li><strong>Dataset</strong>: 500K Sentinel-2 tiles (256×256 px, 10m resolution) covering India, downloaded via Google Earth Engine</li>
  <li><strong>Hardware</strong>: 8× NVIDIA A100 (80GB) at VTL, 800 epochs, ~5 days</li>
  <li><strong>Mask ratio</strong>: 75% (same as original MAE)</li>
  <li><strong>Learning rate</strong>: cosine schedule, warmup 40 epochs, peak 1.5e-4</li>
</ul>

<h2>Results on Downstream Tasks</h2>
<table>
  <thead>
    <tr><th>Task</th><th>RGB MAE</th><th>SatMAE (baseline)</th><th>Ours</th></tr>
  </thead>
  <tbody>
    <tr><td>Land Use Classification (BigEarthNet)</td><td>82.3%</td><td>86.1%</td><td><strong>89.4%</strong></td></tr>
    <tr><td>Flood Segmentation (Sen1Floods11)</td><td>74.1%</td><td>79.3%</td><td><strong>83.7%</strong></td></tr>
    <tr><td>Crop Type Mapping (TimeMatch)</td><td>68.9%</td><td>73.2%</td><td><strong>78.1%</strong></td></tr>
    <tr><td>Building Extraction (WHU)</td><td>87.2%</td><td>88.9%</td><td><strong>91.2%</strong></td></tr>
  </tbody>
</table>

<h2>Key Takeaways</h2>
<ol>
  <li>Domain-specific masking strategies matter significantly — our spectral-aware masking beats standard random masking by 2–4% across tasks.</li>
  <li>Geospatial context tokens are low-cost and consistently improve performance (+1.2% avg), especially on tasks with strong geographic distribution shift.</li>
  <li>Multi-spectral pretraining transfers better than RGB pretraining even when fine-tuning with RGB-only input — the model learns richer spatial priors.</li>
</ol>
<p>The pretrained model weights and code will be released publicly after the NeurIPS 2024 camera-ready deadline. Stay tuned to the <a href="/news-events">VTL News page</a> for the release announcement.</p>
`,
  },

  // ─── Blog 3 ─────────────────────────────────────────────────────────────
  {
    id: 3,
    slug: "autonomous-driving-india-iit-av-dataset",
    title: "Why Building an Autonomous Driving Dataset for India is Completely Different",
    excerpt:
      "Cityscapes was built for German roads. KITTI for California highways. When we started the IIT-AV dataset for Indian roads, we quickly realized that existing annotation taxonomies, sensor setups, and training recipes need fundamental rethinking.",
    coverGradient: "from-orange-600 via-rose-700 to-brand-800",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    authorSlug: "vikram-singh",
    authorName: "Vikram Singh",
    authorRole: "PhD Scholar",
    authorInitials: "VS",
    authorAvatarColor: "from-purple-500 to-brand-600",
    publishedAt: "September 15, 2024",
    publishedISO: "2024-09-15",
    readTime: 9,
    tags: ["Autonomous Driving", "Dataset", "India", "Domain Adaptation", "Semantic Segmentation"],
    content: `
<p class="lead">When the SERB project on autonomous driving for Indian roads started in early 2023, the first instinct was to adapt existing datasets. Six months of experiments later, we knew that wasn't going to work. India's roads are a fundamentally different visual world. This post explains why, and what we did about it.</p>

<h2>What Makes Indian Roads Different?</h2>
<p>Let me illustrate with a specific example. On a typical 2km stretch of NH 18 near Tirupati during morning rush hour, we counted:</p>
<ul>
  <li>47 two-wheelers (motorcycles and scooters) — more than all four-wheelers combined</li>
  <li>12 auto-rickshaws cutting across lanes</li>
  <li>3 cattle (two cows, one calf) stationary in the left lane</li>
  <li>8 pedestrians crossing mid-block (no marked crosswalk for 400m)</li>
  <li>1 bullock cart moving against traffic for 200m</li>
  <li>A school bus stopped in the right lane, doors open, children disembarking</li>
</ul>
<p>None of Western autonomous driving datasets have annotation classes for <strong>auto-rickshaws</strong>, <strong>bullock carts</strong>, or <strong>cattle</strong>. Cityscapes's 19-class taxonomy covers Europe brilliantly. For India, it's missing ~30% of safety-critical entities.</p>

<h2>IIT-AV: Our Annotation Taxonomy</h2>
<p>We designed a 27-class taxonomy by combining:</p>
<ol>
  <li>The Cityscapes 19 classes (for semantic compatibility)</li>
  <li>8 India-specific additions: <code>auto-rickshaw</code>, <code>two-wheeler</code>, <code>bullock-cart</code>, <code>cattle</code>, <code>push-cart</code>, <code>road-divider-informal</code>, <code>speed-bump</code>, <code>pothole</code></li>
</ol>
<blockquote>
  <p>A "pothole" isn't just a road feature — for autonomous driving in India, it's a safety-critical object that should trigger a speed reduction response. It deserved its own class.</p>
</blockquote>

<h2>Sensor Setup</h2>
<p>We instrumented a Maruti Suzuki Brezza with a custom sensor rig:</p>
<ul>
  <li>6× USB3 cameras (forward stereo + 4 surround) at 1920×1080, 30 FPS</li>
  <li>1× Velodyne VLP-16 LiDAR (16-channel, 100m range)</li>
  <li>1× GPS/IMU (NovAtel) for geo-tagging</li>
  <li>Edge compute: NVIDIA Xavier AGX (onboard real-time preview)</li>
</ul>
<p>All synchronized via hardware trigger at 30Hz. Total raw data rate: ~2.8 GB/minute.</p>

<h2>The Monsoon Problem</h2>
<p>We collected data across 4 seasons, but monsoon data required special handling. During heavy rain in Tirupati (July–September), several challenges emerged:</p>
<p><strong>Camera lens fogging</strong>: Solved with heated lens housings (3D printed, ₹1,200 total component cost).</p>
<p><strong>LiDAR point cloud sparsity in rain</strong>: Rain droplets cause spurious returns. We implemented a density-based outlier removal (DBSCAN) as a preprocessing step.</p>
<p><strong>Lane marking invisibility</strong>: Indian roads often have faded or non-existent lane markings. In monsoon, water pools make them completely invisible. We added a "no lane marking" flag to our annotation tool.</p>

<h2>Model Performance Gap</h2>
<p>We tested SegFormer-B5 (pre-trained on Cityscapes) on our test set without any adaptation:</p>
<table>
  <thead><tr><th>Class</th><th>Cityscapes mIoU</th><th>IIT-AV mIoU (zero-shot)</th></tr></thead>
  <tbody>
    <tr><td>Car</td><td>91.2%</td><td>79.3%</td></tr>
    <tr><td>Person</td><td>81.4%</td><td>63.1%</td></tr>
    <tr><td>Two-Wheeler (new)</td><td>—</td><td>11.4%</td></tr>
    <tr><td>Auto-Rickshaw (new)</td><td>—</td><td>8.7%</td></tr>
    <tr><td>Cattle (new)</td><td>—</td><td>4.2%</td></tr>
    <tr><td><strong>Overall mIoU</strong></td><td>82.7%</td><td>38.9%</td></tr>
  </tbody>
</table>
<p>The drop from 82.7% to 38.9% zero-shot illustrates exactly why we needed this dataset.</p>

<h2>After Fine-tuning on IIT-AV</h2>
<p>Fine-tuning SegFormer-B5 for 50 epochs on IIT-AV training set (35K frames) achieves <strong>72.1% mIoU</strong> on our test set — a 33.2% absolute improvement. Our domain-adaptive architecture (published at IEEE TIP 2023) further pushes this to <strong>76.4% mIoU</strong> by incorporating adversarial feature alignment from Cityscapes.</p>
<p>The IIT-AV dataset (v1.0, 50K annotated frames) will be released publicly at <a href="https://vtl-av.iittp.ac.in">vtl-av.iittp.ac.in</a> with a CC BY 4.0 license. Annotation tool and evaluation server coming Q1 2025.</p>
`,
  },

  // ─── Blog 4 ─────────────────────────────────────────────────────────────
  {
    id: 4,
    slug: "interpretable-diabetic-retinopathy-ai",
    title: "Why Diabetic Retinopathy AI Must Be Interpretable, Not Just Accurate",
    excerpt:
      "A model that achieves 95% AUC but can't show the ophthalmologist WHY it made a decision will never be trusted in a clinical setting. Here's how we built interpretability into our retinopathy screening system.",
    coverGradient: "from-emerald-600 via-teal-700 to-navy-900",
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80",
    authorSlug: "sanjay-reddy",
    authorName: "Sanjay Reddy",
    authorRole: "PhD Scholar",
    authorInitials: "SR",
    authorAvatarColor: "from-emerald-500 to-teal-600",
    publishedAt: "August 20, 2024",
    publishedISO: "2024-08-20",
    readTime: 8,
    tags: ["Medical Imaging", "Interpretability", "Diabetic Retinopathy", "Clinical AI", "Attention Maps"],
    content: `
<p class="lead">In October 2023, we piloted our diabetic retinopathy detection system at a primary health centre in Rajampet, Andhra Pradesh. The system achieved 93.7% sensitivity and 91.2% specificity on the local population. The ophthalmologist on duty looked at the result and asked one question: "But how does it know?"</p>
<p>That question changed everything about how we think about AI in clinical settings.</p>

<h2>The Black Box Problem in Medical AI</h2>
<p>Standard deep learning models for medical image classification are, at their core, black boxes. They take a fundus image as input, process it through millions of parameters, and output a probability score. When that score says "Moderate NPDR" (Non-Proliferative Diabetic Retinopathy), a physician has no idea which pixels drove that decision.</p>
<p>This matters for three reasons:</p>
<ol>
  <li><strong>Trust</strong>: Physicians will not use a system they can't audit. If the model makes an error, they need to understand why to avoid the same error in the future.</li>
  <li><strong>Safety</strong>: A high-confidence wrong prediction (e.g., the model is "97% confident" it's grade 2, but it's actually grade 4) is catastrophic. Interpretability allows the physician to catch these cases.</li>
  <li><strong>Regulatory</strong>: CDSCO guidelines for AI medical devices in India require evidence of clinical decision support, not just performance metrics.</li>
</ol>

<h2>Our Lesion-Aware Attention Architecture</h2>
<p>Standard attention maps (e.g., GradCAM) are a post-hoc explanation of a decision already made. We took a different approach: we build interpretability <em>into the forward pass</em> using dual-stream architecture.</p>

<h3>Stream 1 — Global Retinal Features</h3>
<p>A ResNet-50 backbone processes the full 1024×1024 fundus image, learning global context: disc-to-macula ratio, vascular tree structure, overall pigmentation.</p>

<h3>Stream 2 — Lesion Detection Stream</h3>
<p>A parallel YOLOv8-seg head detects and segments five lesion types known to indicate DR:</p>
<ul>
  <li><strong>Microaneurysms (MA)</strong>: Small red dots, earliest sign of DR</li>
  <li><strong>Hard Exudates (HE)</strong>: Yellow-white deposits from lipoprotein leakage</li>
  <li><strong>Soft Exudates</strong>: "Cotton wool spots" from nerve fiber infarction</li>
  <li><strong>Hemorrhages</strong>: Red lesions larger than MAs</li>
  <li><strong>Neovascularization (NV)</strong>: New vessel growth, hallmark of PDR</li>
</ul>

<h3>Cross-Attention Fusion</h3>
<p>The lesion detections from Stream 2 generate spatial attention weights that modulate the global feature maps from Stream 1. This means the final grade prediction is explicitly conditioned on which lesions are present and where.</p>
<pre><code class="language-python">class LesionAwareFusion(nn.Module):
    def __init__(self, global_dim=2048, lesion_dim=512, heads=8):
        super().__init__()
        self.cross_attn = nn.MultiheadAttention(global_dim, heads)
        self.lesion_proj = nn.Linear(lesion_dim, global_dim)

    def forward(self, global_feat, lesion_feats):
        # lesion_feats: [N_lesions, lesion_dim]
        # global_feat: [HW, global_dim]
        keys = self.lesion_proj(lesion_feats)  # [N_lesions, global_dim]
        attended, weights = self.cross_attn(
            query=global_feat,
            key=keys,
            value=keys
        )
        # weights: [HW, N_lesions] — which lesions attend to which regions
        return attended, weights
</code></pre>

<h2>What the Physician Sees</h2>
<p>The system now generates a report that includes:</p>
<ol>
  <li>DR Grade prediction (0–4) with confidence</li>
  <li>Lesion overlay on the fundus image — color-coded by lesion type</li>
  <li>Lesion count per category: "Found 12 microaneurysms, 3 hard exudates, 0 neovascularization"</li>
  <li>ETDRS grid zone analysis — which retinal zones are most affected</li>
  <li>A natural language summary: "High density of microaneurysms in superior temporal quadrant suggests early NPDR. No sight-threatening lesions detected."</li>
</ol>

<h2>Clinical Validation Results</h2>
<p>In our pilot at 3 PHCs (August–October 2023), we screened 847 diabetic patients:</p>
<table>
  <thead><tr><th>Metric</th><th>Our System</th><th>Ophthalmologist (reference)</th></tr></thead>
  <tbody>
    <tr><td>Sensitivity (Referable DR)</td><td>93.7%</td><td>91.2%*</td></tr>
    <tr><td>Specificity</td><td>91.2%</td><td>93.8%*</td></tr>
    <tr><td>AUC</td><td>0.971</td><td>—</td></tr>
    <tr><td>Physician agreement with explanation</td><td>87.3%</td><td>—</td></tr>
  </tbody>
</table>
<p><em>*Inter-grader variability between two ophthalmologists on ambiguous cases.</em></p>
<p>The last row is the most important: 87.3% of our explanations (lesion locations, counts, zone analysis) were rated as "clinically reasonable and helpful" by the screening ophthalmologists. That's the trust metric that will determine real-world adoption.</p>

<h2>What's Next</h2>
<p>We're extending the system to cover AMD (Age-related Macular Degeneration) and Glaucoma screening using the same dual-stream framework. We're also building a low-cost smartphone-based fundus adapter that works with our model for last-mile deployment in areas with no ophthalmologist within 100km.</p>
`,
  },

  // ─── Blog 5 ─────────────────────────────────────────────────────────────
  {
    id: 5,
    slug: "nerf-to-gaussian-splatting-2024",
    title: "From NeRF to 3D Gaussian Splatting: What the Evolution Means for Industrial Vision",
    excerpt:
      "Neural Radiance Fields revolutionized novel view synthesis. 3D Gaussian Splatting then made it real-time. But which approach is right for industrial 3D inspection? A practical perspective from our BEL collaboration.",
    coverGradient: "from-brand-600 via-indigo-700 to-purple-900",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80",
    authorSlug: "kalidas-sharma",
    authorName: "Dr. Kalidas S.",
    authorRole: "Principal Investigator",
    authorInitials: "KS",
    authorAvatarColor: "from-brand-500 to-teal-500",
    publishedAt: "July 5, 2024",
    publishedISO: "2024-07-05",
    readTime: 11,
    tags: ["NeRF", "3D Gaussian Splatting", "3D Reconstruction", "Industrial Inspection", "Computer Vision"],
    isFeatured: true,
    content: `
<p class="lead">In 2020, NeRF (Neural Radiance Fields) promised that you could photograph an object from multiple angles and reconstruct it in photorealistic 3D. Four years later, 3D Gaussian Splatting (3DGS) delivers the same quality in real-time. For industrial inspection, where sub-millimeter accuracy and live visualization matter equally, these advances are transformative. Here's our perspective from 3 years of working with BEL on 3D visual inspection.</p>

<h2>A Quick Primer: NeRF vs. 3DGS</h2>
<p>Both approaches solve the same problem: given N photographs of an object from known camera poses, reconstruct a 3D scene that can be rendered from any new viewpoint.</p>

<h3>NeRF</h3>
<p>NeRF represents a scene as a continuous volumetric function (a neural network) that maps a 3D point + viewing direction → RGB color + density. Novel views are rendered by ray-marching through this implicit function and compositing colors along each ray.</p>
<p><strong>Pros</strong>: Photorealistic quality, compact representation, handles fine geometry well.<br>
<strong>Cons</strong>: Slow to train (hours), slow to render (seconds per frame), hard to edit.</p>

<h3>3D Gaussian Splatting</h3>
<p>3DGS represents a scene as a collection of 3D Gaussians — ellipsoidal blobs with position, covariance, color (via spherical harmonics), and opacity. Rendering is done by α-compositing sorted 2D Gaussian "splats" onto the image plane using rasterization.</p>
<p><strong>Pros</strong>: Real-time rendering (100+ FPS), fast training (30–45 min), explicit editable representation.<br>
<strong>Cons</strong>: Memory-intensive (1–2GB per scene), struggles with thin structures and transparent materials.</p>

<h2>The BEL Use Case: PCB Inspection</h2>
<p>BEL (Bharat Electronics Limited) manufactures printed circuit boards for defense and aerospace applications. Quality control requires detecting:</p>
<ul>
  <li>Solder bridging (two adjacent pads incorrectly connected)</li>
  <li>Missing components (component footprint with no component)</li>
  <li>Lifted leads (lead not making contact with pad)</li>
  <li>PCB warping (&gt;0.5mm deviation from flatness)</li>
</ul>
<p>Traditional 2D AOI (Automated Optical Inspection) systems handle the first three reasonably well. Warping detection requires 3D measurement — traditionally done with laser profilometers costing ₹40–60 Lakhs per unit.</p>

<h2>Our NeRF-Based Inspection Pipeline (2021–2023)</h2>
<p>Our initial approach used Instant-NGP (a hash-encoded NeRF variant) for rapid scene reconstruction:</p>
<ol>
  <li><strong>Capture</strong>: 80 images of a PCB from a robot arm at known poses (30 seconds)</li>
  <li><strong>Reconstruct</strong>: Instant-NGP trains in 90 seconds on a single A100</li>
  <li><strong>Inspect</strong>: Extract depth map from the trained NeRF; compare to CAD reference</li>
  <li><strong>Detect</strong>: Anomaly detection on depth map differences</li>
</ol>
<p><strong>Result</strong>: 97.8% defect detection rate, 1.2% false positive rate on BEL's test set of 500 PCBs.</p>
<p>The limitation: 90 seconds for reconstruction is too slow for inline inspection at 200 PCBs/hour throughput. We needed a faster approach.</p>

<h2>Switching to 3DGS (2023–2024)</h2>
<p>With 3DGS, reconstruction time dropped to 8 minutes for the same PCB — still too slow for inline use, but the rendering speed opened new possibilities:</p>
<p><strong>Interactive anomaly review</strong>: Instead of a single depth map, inspectors can now orbit the 3D Gaussian representation in real-time, zooming into suspicious regions from any angle. This dramatically reduces false positive rate — inspectors can confirm whether a detected anomaly is real or a rendering artifact in &lt;10 seconds.</p>
<p><strong>Differential analysis</strong>: We render the current board and a "golden" reference board from identical viewpoints and compute per-pixel difference maps. Gaussian splat manipulations allow us to isolate specific components for comparison.</p>

<h2>Current Status and Open Challenges</h2>
<table>
  <thead><tr><th>Requirement</th><th>NeRF</th><th>3DGS</th><th>Target</th></tr></thead>
  <tbody>
    <tr><td>Reconstruction time</td><td>90s</td><td>8 min</td><td>&lt;30s</td></tr>
    <tr><td>Rendering speed</td><td>2 FPS</td><td>120 FPS</td><td>&gt;30 FPS ✓</td></tr>
    <tr><td>Geometric accuracy</td><td>0.3mm</td><td>0.4mm</td><td>&lt;0.5mm ✓</td></tr>
    <tr><td>Solder bridge detection</td><td>97.8%</td><td>96.1%</td><td>&gt;95% ✓</td></tr>
    <tr><td>Transparent component handling</td><td>Fair</td><td>Poor</td><td>Good</td></tr>
  </tbody>
</table>
<p>The two open challenges are: <strong>reducing reconstruction time</strong> (we're exploring distillation from a pretrained generalizable NeRF) and <strong>handling transparent/reflective surfaces</strong> (solder joints are notoriously specular). Both are active research directions in the lab.</p>

<blockquote>
  <p>The goal isn't to replace human inspectors — it's to give them superhuman 3D vision so they can focus their expertise where it matters most.</p>
</blockquote>

<p>Our full pipeline code (with synthetic PCB dataset for testing) will be released as open-source after the IEEE TII paper acceptance. Follow <a href="/news-events">VTL News</a> for the announcement.</p>
`,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogs.map((b) => b.slug);
}

export function getFeaturedBlogs(): Blog[] {
  return blogs.filter((b) => b.isFeatured);
}
